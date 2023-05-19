const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .sort({ createAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    // Get single thought by id
    getSingleThought(req,res) {
      Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
    },
    // Create a thought
    createThought(req,res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            )
        })
        .then((dbUserData) => {
            // AS FAR AS I GOT!!!!!!
        })
    }
}