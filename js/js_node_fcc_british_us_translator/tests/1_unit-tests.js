const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator()

suite('Unit Tests', () => {
  test(
    'Translate Mangoes are my favorite fruit. to British English',
    (done) => 
    {
      const test = 'Mangoes are my favorite fruit.'
      const locale = 'american-to-british'
      const expected = 'Mangoes are my favourite fruit.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected);
      done();
    }
  )
  test(
    'Translate I ate yogurt for breakfast. to British English',
    (done) => 
    {
      const expected = 'I ate yoghurt for breakfast.'
      const test = 'I ate yogurt for breakfast.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    "Translate We had a party at my friend's condo. to British English",
    (done) => 
    {
      const test = 'We had a party at my friend\'s condo.'
      const expected = 'We had a party at my friend\'s flat.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation();
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Can you toss this in the trashcan for me? to British English',
    (done) => 
    {
      const test = 'Can you toss this in the trashcan for me?'
      const expected = 'Can you toss this in the bin for me?'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateRegularPhrases()
        .translateUniquePhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation();
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate The parking lot was full. to British English',
    (done) => 
    {
      const test = 'The parking lot was full.'
      const expected = 'The car park was full.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Like a high tech Rube Goldberg machine. to British English',
    (done) => 
    {
      const test = 'Like a high tech Rube Goldberg machine.'
      const expected = 'Like a high tech Heath Robinson device.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate To play hooky means to skip class or work. to British English',
    (done) => 
    {
      const test = 'To play hooky means to skip class or work.'
      const expected = 'To bunk off means to skip class or work.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate No Mr. Bond, I expect you to die. to British English',
    (done) => 
    {
      const test = 'No Mr. Bond, I expect you to die.'
      const expected = 'No Mr Bond, I expect you to die.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Dr. Grosh will see you now. to British English',
    (done) => 
    {
      const test = 'Dr. Grosh will see you now.'
      const expected = 'Dr Grosh will see you now.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Lunch is at 12:15 today. to British English',
    (done) => 
    {
      const test = 'Lunch is at 12:15 today.'
      const expected = 'Lunch is at 12.15 today.'
      const locale = 'american-to-british'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate We watched the footie match for a while. to American English',
    (done) => 
    {
      const test = 'We watched the footie match for a while.'
      const locale = 'british-to-american'
      const expected = 'We watched the soccer match for a while.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Paracetamol takes up to an hour to work. to American English',
    (done) => 
    {
      const test = 'Paracetamol takes up to an hour to work.'
      const locale = 'british-to-american'
      const expected = 'Tylenol takes up to an hour to work.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate First, caramelise the onions. to American English',
    (done) => 
    {
      const test = 'First, caramelise the onions.'
      const locale = 'british-to-american'
      const expected = 'First, caramelize the onions.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate I spent the bank holiday at the funfair. to American English',
    (done) => 
    {
      const test = 'I spent the bank holiday at the funfair.'
      const locale = 'british-to-american'
      const expected = 'I spent the public holiday at the carnival.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate I had a bicky then went to the chippy. to American English',
    (done) => 
    {
      const test = 'I had a bicky then went to the chippy.'
      const locale = 'british-to-american'
      const expected = 'I had a cookie then went to the fish-and-chip shop.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    "Translate I've just got bits and bobs in my bum bag. to American English",
    (done) => 
    {
      const test = 'I\'ve just got bits and bobs in my bum bag.'
      const locale = 'british-to-american'
      const expected = 'I\'ve just got odds and ends in my fanny pack.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    "Translate The car boot sale at Boxted Airfield was called off. to American English",
    (done) => 
    {
      const test = 'The car boot sale at Boxted Airfield was called off.'
      const locale = 'british-to-american'
      const expected = 'The swap meet at Boxted Airfield was called off.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Have you met Mrs Kalyani? to American English',
    (done) => 
    {
      const test = 'Have you met Mrs Kalyani?'
      const locale = 'british-to-american'
      const expected = 'Have you met Mrs. Kalyani?'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation();
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    "Translate Prof Joyner of King's College, London. to American English",
    (done) => 
    {
      const test = 'Prof Joyner of King\'s College, London.'
      const locale = 'british-to-american'
      const expected = 'Prof. Joyner of King\'s College, London.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Translate Tea time is usually around 4 or 4.30. to American English',
    (done) => 
    {
      const test = 'Tea time is usually around 4 or 4.30.'
      const locale = 'british-to-american'
      const expected = 'Tea time is usually around 4 or 4:30.'
      const translation = translator
        .initialize(test,locale)
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Highlight translation in Mangoes are my favorite fruit.',
    (done) => 
    {
      const test = 'Mangoes are my favorite fruit.'
      const locale = 'american-to-british'
      const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
      const translation = translator
        .initialize(test,locale)
        .withHighlight()
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Highlight translation in I ate yogurt for breakfast.',
    (done) => 
    {
      const test = 'I ate yogurt for breakfast.'
      const locale = 'american-to-british'
      const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
      const translation = translator
        .initialize(test,locale)
        .withHighlight()
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Highlight translation in We watched the footie match for a while.',
    (done) => 
    {
      const test = 'We watched the footie match for a while.'
      const locale = 'british-to-american'
      const expected = 'We watched the <span class="highlight">soccer</span> match for a while.'
      const translation = translator
        .initialize(test,locale)
        .withHighlight()
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
  test(
    'Highlight translation in Paracetamol takes up to an hour to work.',
    (done) => 
    {
      const test = 'Paracetamol takes up to an hour to work.'
      const locale = 'british-to-american'
      const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      const translation = translator
        .initialize(test,locale)
        .withHighlight()
        .translateUniquePhrases()
        .translateRegularPhrases()
        .translateTimes()
        .translateTitles()
        .getTranslation()
      assert.equal(translation,expected)
      done()
    }
  )
});
