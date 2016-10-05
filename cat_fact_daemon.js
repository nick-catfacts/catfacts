var CronJob = require('cron').CronJob;

var job = new CronJob({

    cronTime: '* 0-59 * * * *',

    onTick: function() {

      out('sup');

    },

    onComplete: function(){
      console.log('cat_fact_daemon is stopping');
    },

    start: true,

    timeZone: 'America/Los_Angeles'
  });

job.start();



var out = function(out) {

  console.log(out);
}