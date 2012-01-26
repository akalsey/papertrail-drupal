Papertrail for Drupal
======================

Copyright 2012 Adam Kalsey http:/kalsey.com/

Integrates with Papertrailapp.com to implement a live "tail -f" style interface for logging that is managed with Papertrail. Future releases will provide more facilities for searching Papertrail logs and configuring and managing your Papertrail account.

Originally developed for [Tropo's voice and SMS API](http://tropo.com/) service.

Requirements
------------

* A [Papertrail](http://papertrailapp.com/) account

Installation
------------

After enabling the module, go to admin/config/development/logging/papertrail and enter your API key.

Usage
-----

First, start sending logs to Papertrail. This doesn't do anything unless Papertrail is indexing your logs. Visit admin/reports/papertrail for the default tail view. You'll see recent log items appear right away, and as new log items are indexed, they'll appear in the log viewer.

To implement a tail in your own Drupal module, you'll want to create two functions, both with hook_menu entries. One function will be your ajax source and will call `papertrail_tail_data` with your search string. The other is the URL your users will connect to in order to view the tail and will make a recursive ajax call to retreive and display the search results.

    function yourmodule_debugger_source() {
      print papertrail_tail_data(array('parameter' => 'search-string'));
    }

    function yourmodule_debugger() {
      // reset the min_id tracker.
      papertrail_tail_data(array('#reset' => true)); 
       
      // the URL of the ajax backend (the menu pointing at 
      // yourmodule_debugger_source() in this example)
      drupal_add_js('var url = "' . url('url/to/yourmodule_debugger_source', array('absolute' => TRUE)) . '";', 'inline');
      // include the papertrail ajax JS
      drupal_add_js(drupal_get_path('module', 'papertrail') . '/tail.js', array('scope' => 'footer'));
      
      // tail.js will append new log lines to #papertrail-wrapper
      return '<div id="papertrail-wrapper">Ready.</div>';
    }