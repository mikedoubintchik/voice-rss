# How to become a contributor and submit your own code

**Table of contents**

* [Contributing a patch](#contributing-a-patch)
* [Running the tests](#running-the-tests)
* [Releasing the library](#releasing-the-library)

## Contributing a Patch

1.  Submit an issue describing your proposed change to the repo in question.
1.  The repo owner will respond to your issue promptly.
1.  If your proposed change is accepted, and you haven't already done so, sign a
    Contributor License Agreement (see details above).
1.  Fork the desired repo, develop and test your code changes.
1.  Ensure that your code adheres to the existing style in the code to which
    you are contributing.
1.  Ensure that your code has an appropriate set of tests which all pass.
1.  Submit a pull request.

## Running the tests

1.  [Prepare your environment for Node.js setup][setup].

1.  Install dependencies:

        yarn

1.  Run the tests:

        npm test

1.  Lint (and maybe fix) any changes:

        npm run fix

[setup]: https://cloud.google.com/nodejs/docs/setup
