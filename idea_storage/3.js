    stripe.customers.create({
      description: 'Customer for user.',
    },
    function(err, customer) {
      // asynchronously called
    });



    async_tasks = []

    async_tasks.push(
      // Set the user's default settings.
      function(cb) {
        account.customData.balance = 0;
        account.customData.totalQueries = 0;
        account.customData.save(function(err) {
          if (err) return cb(err);
          cb();
        });
      },
    );


    async.parallel(async_tasks, function(err) {
      if (err) return next(err);
      next();
    });