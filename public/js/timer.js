function Timer(tick, onTick) {
    var self = this,
        interval,
        startTime,
        count

    self.start = function() {
        count = 0
        startTime = (new Date()).toISOString()
        interval = window.setInterval(function() {
            count++
            onTick(self, count)
        }, tick)
    }

    self.stop = function() {
        count = 0;
        clearInterval(interval)
        return {
            start: startTime,
            end: (new Date()).toISOString()
        }
    }

    self.restart = function() {
    	self.stop();
    	self.start();
    }
}