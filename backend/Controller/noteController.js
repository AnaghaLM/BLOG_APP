const notes=require('../Models/noteModel')



exports.createNoteController = async (req, res) => {
    console.log("inside createNoteController");

    const { title, body, category } = req.body

    try {

        const note = new notes({ title, body, category, userId: req.user.id })

        await note.save()

        res.status(201).json(note)

    } catch (err) {
        res.status(500).json(err)
        console.log(err);

    }
}







 exports.getNotesController = async (req, res) => {

    console.log("inside getNotesController")

    try {

        const getNotes = await notes.find({ userId: req.user.id }).sort({ createdAt: -1 })

        res.status(200).json(getNotes)

    } catch (err) {

        res.status(500).json(err)

    }
}




exports.getSingleBlogController = async (req, res) => {

    console.log("inside getSingleBlogController")

    const { id } = req.params

    try {

        const singleBlog = await notes.findById(id)

        res.status(200).json(singleBlog)

    } catch (err) {

        res.status(500).json(err)

    }
}








exports.updateNoteController = async (req, res) => {

    console.log("inside updateNoteController")

    const { id } = req.params
    const { title, body, category } = req.body

    try {

        const updatedNote = await notes.findByIdAndUpdate(id, { title, body, category }, { new: true })

        res.status(200).json(updatedNote)

    } catch (err) {

        res.status(500).json(err)

    }
}


exports.deleteNoteController = async (req, res) => {

    console.log("inside deleteNoteController")

    const { id } = req.params

    try {

        await notes.findByIdAndDelete(id)
        res.status(200).json("Note deleted successfully")

    } catch (err) {

        res.status(500).json(err)

    }
}




