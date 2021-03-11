# ERP Data Visualizer

Live demo [here](https://pushpendersaini0.github.io/erp-data-visualizer/)

Erp Data Visualizer is a simple tool to plot the absent summary data from ERP of ncuindia into beautiful and informative graphs.

### Working

* The tool takes user's ASP Session ID as input which the user can find in cookies after a successful login in erp website.

* The Session ID is used to make an API call to a server that will scrape the tables in absent summary section and convert the result into JSON.

* This JSON is then stored and processed in client browser using JS and the processed data is plotted using Chatjs library

### Contribution

The code is commented out and easy to understand , to contribute make your changes and test on a local machine then start a pull request with the details of changes made.