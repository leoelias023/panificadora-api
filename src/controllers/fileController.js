module.exports = {
    store: (req,res) => {
        return res.json(req.file);
    }
}