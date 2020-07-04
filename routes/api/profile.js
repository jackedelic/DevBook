const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require("express-validator");
const config = require("config");
const axios = require("axios");

// @route    GET /api/profile/me
// @desc     get current user's profile based on token
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      console.log("no profile");
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }
    return res.json(profile);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ msg: "Server error " });
  }
});

// @route    POST /api/profile
// @desc     Create or update current user's profile
// @access   Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required.").not().isEmpty(),
    check("skills", "Skills is required.").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id; // Recall we attach decoded token value to req in auth middleware.
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      console.log(skills);
      profileFields.skills = skills.split(",").map((s) => s.trim());
    }
    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id }).exec();
      if (profile) {
        // if existing profile found
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // Create profile if no existing profile is found
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).json("Server error");
    }
  }
);

// @route    GET /api/profile
// @desc     get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "server error " });
  }
});

// @route    GET /api/profile/user/:user_id
// @desc     get profile by user id
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found." });
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).json({ msg: "server error " });
  }
});

// @route    DELETE /api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({
      user: req.user.id, // remember this is a private. user shd have been authenticated with user.id
    });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).json({ msg: "server error " });
  }
});

// @route    PUT /api/profile/experience, (some use POST)
// @desc     Add profile experience
// @access   Private
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").not().isEmpty(),
    check("company", "Company is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("from", "Starting date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      if (profile.experience === undefined) profile.experience = []; // technically this is not required because by default we have empty [], refer to Profile model.
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: "server error " });
    }
  }
);

// @route    DELETE /api/profile/experience/:exp_id, (some use put)
// @desc     Delete one profile experience
// @access   Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    if (removeIndex < 0)
      return res.status(500).json({ msg: "experience not found" });
    profile.experience.splice(removeIndex, 1); // Alternatively we can just filter out the experience to be removed
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(e.message);
    res.status(500).json({ msg: "server error " });
  }
});

// @route    PUT /api/profile/education, (some use POST)
// @desc     Add profile education
// @access   Private
router.put(
  "/education",
  [
    auth,
    check("school", "School is required").not().isEmpty(),
    check("degree", "Degree is required").not().isEmpty(),
    check("fieldofstudy", "Field of study is required").not().isEmpty(),
    check("from", "Starting date is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      if (profile.education === undefined) profile.experience = []; // technically this is not required because by default we have empty [], refer to Profile model.
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: "server error." });
    }
  }
);

// @route    DELETE /api/education/:edu_id, (some use put)
// @desc     Delete one profile education
// @access   Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    if (removeIndex < 0)
      return res.status(500).json({ msg: "education not found" });
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(e.message);
    res.status(500).json({ msg: "server error " });
  }
});

// @route    GET /api/profile/github/:username
// @desc     Get user repos from github
// @access   Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      url: `https://api.github.com/users/${req.params.username}/repos?`,
      params: {
        per_page: "5",
        sort: "created:asc",
      },
      method: "get",
      headers: {
        Authorization: `token ${config.get("githubToken")}`,
      },
    };
    const r = await axios(options);
    if (r.status !== 200) {
      return res.status(404).json({ msg: "No Github profile found" });
    }
    return res.json(r.data);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: "server error " });
  }
});

module.exports = router;
