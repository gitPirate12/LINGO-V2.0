const router = require("express").Router();
const Emoji = require("../models/Emoji");

// Route to add a new emoji
router.route("/add").post(async (request, response) => {
    const { emoji, meaningEng, meaningSin } = request.body;

    try {
        // Check if the emoji already exists
        const existingEmoji = await Emoji.findOne({ emoji });
        if (existingEmoji) {
            return response.status(400).json({ status: "Error", error: "Emoji already exists" });
        }

        const newEmoji = new Emoji({
            emoji,
            meaningEng,
            meaningSin
        });

        await newEmoji.save();
        response.json("Emoji added successfully");
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error adding emoji", error: error.message });
    }
});


// Route to get all emojis
router.route("/").get((request, response) => {
    Emoji.find()
        .then(emojis => {
            response.json(emojis);
        })
        .catch(error => {
            console.log(error);
            response.status(500).send({ status: "Error getting emojis", error: error.message });
        });
});

// Route to update an emoji by ID
router.route("/update/:id").put(async (request, response) => {
    const { emoji, meaningEng, meaningSin } = request.body;
    const emojiId = request.params.id;

    try {
        const updatedEmoji = await Emoji.findByIdAndUpdate(emojiId, { emoji, meaningEng, meaningSin }, { new: true });
        response.json(updatedEmoji);
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error updating emoji", error: error.message });
    }
});

// Route to delete an emoji by ID
router.route("/delete/:id").delete(async (request, response) => {
    const emojiId = request.params.id;

    try {
        const deletedEmoji = await Emoji.findByIdAndDelete(emojiId);
        if (deletedEmoji) {
            response.json({ status: "Emoji deleted successfully" });
        } else {
            response.status(404).json({ status: "Emoji not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error deleting emoji", error: error.message });
    }
});

// Route to get an emoji by ID
router.route("/get/:id").get(async (request, response) => {
    const emojiId = request.params.id;

    try {
        const emoji = await Emoji.findById(emojiId);
        if (emoji) {
            response.json(emoji);
        } else {
            response.status(404).json({ status: "Emoji not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error getting emoji", error: error.message });
    }
});

// Route to search emoji by entering emoji
router.route("/search/:emoji").get(async (request, response) => {
    const enteredEmoji = request.params.emoji;

    try {
        const emoji = await Emoji.findOne({ emoji: enteredEmoji });
        if (emoji) {
            response.json({ status: "Emoji found", meaningEng: emoji.meaningEng, meaningSin: emoji.meaningSin });
        } else {
            response.status(404).json({ status: "Emoji not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error searching emoji", error: error.message });
    }
});

module.exports = router;