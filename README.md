The Euricom interactive tech radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Radar

You can see the radar in action at [https://euricom-tech-radar.vercel.app](https://euricom-tech-radar.vercel.app/).

## How to use

Edit the the `public/web.csv` and/or `public/dotnet.csv` file to add your own radar items. The format is as follows:

```
name,ring,quadrant,isNew,description
Composer,adopt,tools,TRUE,"Although the idea of dependency management ..."
Canary builds,trial,techniques,FALSE,"Many projects have external code dependencies ..."
Apache Kylin,assess,platforms,TRUE,"Apache Kylin is an open source analytics solution ..."
JSF,hold,languages & frameworks,FALSE,"We continue to see teams run into trouble using JSF ..."
```

Each insight we share is represented by a blip. Blips may be new to the latest Radar volume, or they can move rings as our recommendation has changed.

The rings are:

* **Adopt**. Blips that we think you should seriously consider using.

* **Trial**. Things we think are ready for use, but not as completely proven as those in the Adopt ring.

* **Assess**. Things to look at closely, but not necessarily trial yet — unless you think they would be a particularly good fit for you.

* **Hold**. Proceed with caution.

The quadrants are:

* **Techniques**. This quadrant includes the methods, practices, conventions, and design patterns that are used in the development process. Design patterns are reusable solutions to common problems that occur in software design. They represent best practices and can be used to improve the structure and efficiency of your code. Other techniques could include agile development practices, DevOps strategies, or testing methodologies. They are generally not tied to a specific technology or platform but are more about how teams work together to deliver software.

* **Platforms & Infrastructure**. This quadrant refers to the underlying technology that software is built upon. This could be a specific type of database, a cloud computing platform, or a type of server. These are the foundational elements that software runs on and interacts with. They often involve decisions about trade-offs between cost, performance, and ease of use.

* **Tools**. This quadrant includes the software applications that developers use to create, test, debug, and maintain their software. These could be Integrated Development Environments (IDEs), version control systems, or automated testing tools. Tools are often chosen based on their ability to improve productivity, support collaboration, and integrate with other parts of the development ecosystem

* **Frameworks & Languages**. This quadrant refers to the programming languages and frameworks used to write software. Frameworks include those built on JavaScript like React, Angular, and Vue.js, libraries such as jQuery and Lodash, and .NET frameworks like ASP.NET and .NET Core. These frameworks and libraries provide pre-written code to solve common problems, which can speed up development and reduce errors. Programming languages are the syntax and semantics that programmers use to instruct computers. Choices in this quadrant often depend on the nature of the project, the skills of the team, and the requirements of the system being built..

## Local Development Startup

```bash
export QUADRANTS='["Techniques", "Platforms & Infrastructure", "Tools", "Languages & Frameworks"]'
export RINGS='["Adopt", "Trial", "Assess", "Hold"]'
export DOC_URL=http://localhost:8080/web.json
pnpm dev
```


## Alternative use

The easiest way to use the app out of the box is to provide a _public_ Google Sheet ID from which all the data will be fetched. You can enter that ID into the input field and your radar will be generated once you click the submit button. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

| name          | ring   | quadrant               | isNew | description                                             |
| ------------- | ------ | ---------------------- | ----- | ------------------------------------------------------- |
| Composer      | adopt  | tools                  | TRUE  | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE  | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE | We continue to see teams run into trouble using JSF ... |

### Sharing the sheet

- In Google Sheets, click on "Share".
- On the pop-up that appears, set the General Access as "Anyone with the link" and add "Viewer" permission.
- Use the URL link of the sheet.

The URL will be similar to [https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit](https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit). In theory we are only interested in the part between '/d/' and '/edit' but you can use the whole URL if you want.

### Using private Google Sheet

When using a private Google Sheet as your input, you will be prompted with a Google One Tap Login popup. Once you have logged in with the appropriate Google Account and authorized our app to access the sheet, the Radar will be generated.

The input data format for the private sheet is the same as a public Google Sheet.

### Using CSV data

The other way to provide your data is using CSV document format.
You can enter a publicly accessible URL (not behind any authentication) of a CSV file into the input field on the first page.
For example, a [raw URL](https://raw.githubusercontent.com/thoughtworks/build-your-own-radar/master/spec/end_to_end_tests/resources/sheet.csv) for a CSV file hosted publicly on GitHub can be used.
The format is just the same as that of the Google Sheet, the example is as follows:

```
name,ring,quadrant,isNew,description
Composer,adopt,tools,TRUE,"Although the idea of dependency management ..."
Canary builds,trial,techniques,FALSE,"Many projects have external code dependencies ..."
Apache Kylin,assess,platforms,TRUE,"Apache Kylin is an open source analytics solution ..."
JSF,hold,languages & frameworks,FALSE,"We continue to see teams run into trouble using JSF ..."
```

If you do not want to host the CSV file publicly, you can follow [these steps](#advanced-option---docker-image-with-a-csvjson-file-from-the-host-machine) to host the file locally on your BYOR docker instance itself.

**_Note:_** The CSV file parsing is using D3 library, so consult the [D3 documentation](https://github.com/d3/d3-request/blob/master/README.md#csv) for the data format details.

### Using JSON data

Another other way to provide your data is using a JSON array.
You can enter a publicly accessible URL (not behind any authentication) of a JSON file into the input field on the first page.
For example, a [raw URL](https://raw.githubusercontent.com/thoughtworks/build-your-own-radar/master/spec/end_to_end_tests/resources/data.json) for a JSON file hosted publicly on GitHub can be used.
The format of the JSON is an array of objects with the the fields: `name`, `ring`, `quadrant`, `isNew`, and `description`.

An example:

```json
[
  {
    "name": "Composer",
    "ring": "adopt",
    "quadrant": "tools",
    "isNew": "TRUE",
    "description": "Although the idea of dependency management ..."
  },
  {
    "name": "Canary builds",
    "ring": "trial",
    "quadrant": "techniques",
    "isNew": "FALSE",
    "description": "Many projects have external code dependencies ..."
  },
  {
    "name": "Apache Kylin",
    "ring": "assess",
    "quadrant": "platforms",
    "isNew": "TRUE",
    "description": "Apache Kylin is an open source analytics solution ..."
  },
  {
    "name": "JSF",
    "ring": "hold",
    "quadrant": "languages & frameworks",
    "isNew": "FALSE",
    "description": "We continue to see teams run into trouble using JSF ..."
  }
]
```

If you do not want to host the JSON file publicly, you can follow [these steps](#advanced-option---docker-image-with-a-csvjson-file-from-the-host-machine) to host the file locally on your BYOR docker instance itself.

**_Note:_** The JSON file parsing is using D3 library, so consult the [D3 documentation](https://github.com/d3/d3-request/blob/master/README.md#json) for the data format details.

### Building the radar

Paste the URL in the input field on the home page.

That's it!

**_Note:_** When using the BYOR app on [radar.thoughtworks.com](https://radar.thoughtworks.com), the ring and quadrant names should be among the values mentioned in the [example above](#setting-up-your-data). This holds good for Google Sheet, CSV or JSON inputs.
For a self hosted BYOR app, there is no such condition on the names. Instructions to specify custom names are in the [next section](#more-complex-usage).

Check [this page](https://www.thoughtworks.com/radar/byor) for step by step guidance.

### More complex usage

To create the data representation, you can use the Google Sheet [factory](/src/util/factory.js) methods or CSV/JSON, or you can also insert all your data straight into the code.

The app uses [Google Sheets APIs](https://developers.google.com/sheets/api/reference/rest) to fetch the data from a Google Sheet or [D3.js](https://d3js.org/) if supplied as CSV/JSON, so refer to their documentation for more advanced interaction. The input data is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

Google OAuth Client ID and API Key can be obtained from your Google Developer Console. OAuth Client ID is mandatory for private Google Sheets, as it is needed for Google Authentication and Authorization of our app.

```
export CLIENT_ID=[Google Client ID]
```

**_Note:_** Make sure to set the "Authorized JavaScript origins" field for the Client ID to the right origin domain, with port, where the app is hosted. Examples: `http://localhost:8080` or `https://radar.thoughtworks.com`.

Optionally, API Key can be set to bypass Google Authentication for public sheets.

```
export API_KEY=[Google API Key]
```

To enable Google Tag Manager, add the following environment variable.

```
export GTM_ID=[GTM ID]
```

To enable Adobe Launch, add the following environment variable.

```
export ADOBE_LAUNCH_SCRIPT_URL=[Adobe Launch URL]
```

To specify custom ring and/or quadrant names, add the following environment variables with the desired values.

```
export RINGS='["Adopt", "Trial", "Assess", "Hold"]'
export QUADRANTS='["Techniques", "Platforms", "Tools", "Languages & Frameworks"]'
```

## Other tech radars

- https://radar.thoughtworks.com/?documentId=https%3A%2F%2Fraw.githubusercontent.com%2Fgitsindonesia%2Ftech-radar%2Fmain%2Ffrontend.json
-
