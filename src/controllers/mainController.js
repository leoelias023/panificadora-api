module.exports = {
    index: (req,res) => {
        res.json({error: "Não foi possível acessar essa aplicação, apenas administradores"})
    }
}