const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Utiliser body-parser pour analyser le corps des requêtes JSON
app.use(bodyParser.json());



// Middleware pour valider le produit
const validateProduct = (req, res, next) => {
    const { name, price } = req.body;
  
    // Vérifier si le nom est présent
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).send('Le nom du produit est requis et doit être une chaîne non vide.');
    }
  
    // Vérifier si le prix est présent et est un nombre positif
    if (price === undefined || typeof price !== 'number' || price <= 0) {
      return res.status(400).send('Le prix du produit est requis et doit être un nombre positif.');
    }
  
    // Si tout est valide, passer à la route suivante
    next();
  };
  
  
  app.use((err, req, res, next) => {
    // Si l'erreur a un statut, l'utiliser. Sinon, on utilise 500 (erreur interne du serveur).
    res.status(err.status || 500).send(err.message || 'Erreur serveur');
  });
  

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
