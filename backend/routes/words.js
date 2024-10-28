const router = require("express").Router()
const Words = require("../models/words")


router.post("/add",async(req,res)=>{
    
     const{GalleWord} = req.body
    const WordDoc = await Words.create({
     GalleWord
    })
    res.json({WordDoc});
   
 })

//get all words
router.route("/").get((request, response) => {
    Words.find()
        .then(GalleWord => {
            response.json(GalleWord);
        })
        .catch(error => {
            console.log(error);
            response.status(500).send({ status: "Error getting Words", error: error.message });
        });
});


// Route to delete an word
router.route("/delete/:id").delete(async (request, response) => {
    const wordId = request.params.id;

    try {
        const deletedWord = await Words.findByIdAndDelete(wordId);
        if (deletedWord) {
            response.json({ status: "Word deleted successfully" });
        } else {
            response.status(404).json({ status: "Word not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error deleting Word", error: error.message });
    }
});

// Route to search word
router.route("/:NO").get(async (request, response) => {
    const enteredWord = request.params.NO;

    try {
        const word = await Words.findOne({ NO: enteredWord });
        if (word) {
            response.json({ status: "Emoji found", GalleWord: word.GalleWord});
        } else {
            response.status(404).json({ status: "Emoji not found" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ status: "Error searching emoji", error: error.message });
    }
});

module.exports = router