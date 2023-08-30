'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();
  
  app.route('/api/translate')
    .post(
      (req, res) => 
      {
        const {text,locale} = req.body
        try 
        {
          const translation = translator
            .withHighlight()
            .initialize(text,locale)
            .translateUniquePhrases()
            .translateRegularPhrases()
            .translateTimes()
            .translateTitles()
            .getTranslation()
          //console.log({translation,text});
          return res.status(200).json({
            text,
            translation: translation !== text 
              ? translation
              : "Everything looks good to me!"
          })
        }
        catch(e)
        {
          //console.log(e)
          return res.status(200).json(e)
        }
      }
    );
};
