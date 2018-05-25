const mongoose = require("mongoose");

const Ressources = require("../models/ressources");

exports.get_all_ressources = (req, res, next) => {
  Ressources.find()
    .select("_id name intro displayName category installation documentation tutorials exercices examples news")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        ressources: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            displayName: doc.displayName,
            intro: doc.intro,
            category: doc.category,            
            installation: doc.installation,
            documentation: doc.documentation,
            tutorials: doc.tutorials,
            exercices: doc.exercices,
            examples: doc.examples,
            news: doc.news
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.get_ressource = (req, res, next) => {
  Ressources.findById(req.params.ressourceId)
    .exec()
    .then(ressources => {
      if (!ressources) {
        return res.status(404).json({
          message: "Ressources not found"
        });
      }
      res.status(200).json({
        ressources: ressources
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}
exports.get_ressourceName = (req, res, next) => {
  const reqName = req.params.ressourceName
  Ressources.findOne({ name: reqName })
    .select("_id name intro displayName category installation documentation tutorials exercices examples news")
    .exec()
    .then(ressources => {
      if (!ressources) {
        return res.status(404).json({
          message: "Ressources not found"
        });
      }
      res.status(200).json({
        ressources: ressources
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.create_ressource = (req, res, next) => {
  const newRessources = new Ressources({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    displayName: req.body.displayName,
    intro: req.body.intro,
    category: req.body.category,    
    installation: req.body.installation,
    documentation: req.body.documentation,
    tutorials: req.body.tutorials,
    exercices: req.body.exercices,
    examples: req.body.examples,
    news: req.body.news
  });
  newRessources
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created ressources successfully",
        createdRessources: {
          _id: result._id,
          name: result.name,
          displayName: result.displayName,
          intro: result.intro,
          category: result.category,
          installation: result.installation,
          documentation: result.documentation,
          tutorials: result.tutorials,
          exercices: result.exercices,
          examples: result.examples,
          news: result.news
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.update_ressource = (req, res, next) => {

  const reqName = req.params.ressourceName;

  Ressources.findOneAndUpdate({
      name: reqName
    }, req.body, {
      new: false
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Ressources updated'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.delete_ressource = (req, res, next) => {
  const reqName = req.params.ressourceName;

  Ressources.remove({
      name: reqName
    })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Ressources deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}