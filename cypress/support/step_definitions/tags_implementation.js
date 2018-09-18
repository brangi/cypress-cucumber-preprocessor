/* global given, then */

const { proceedCurrentStep } = require("cypress-cucumber-preprocessor/tagsHelper"); // eslint-disable-line
// import/no-extraneous-dependencies

let parsedTags;

given(/my cypress environment variable TAGS is '(.+)'/, envTagsString => {
  parsedTags = envTagsString;
});

then(/the cypress runner should not break/, () => {
  expect(proceedCurrentStep([{ name: "TESTTAG" }], parsedTags)).to.not.throw; // eslint-disable-line
  // no-unused-expressions
});

then(
  /tests tagged '(.+)' should (not )?proceed/,
  (tags, shouldProceed = false) => {
    const tagsArray = tags.split(" ").map(tag => ({ name: tag }));
    expect(proceedCurrentStep(tagsArray, parsedTags)).to.equal(!shouldProceed);
  }
);
