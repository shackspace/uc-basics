( function($) {
    $.fn.larson = function(param) {
        this.larson_setup = function(nled) {
            this.nled = nled;
            this.rst = nled;
            this.cnt = nled;
            this.timeout = 1000/this.nled;
            this.larson_running = false;

            $(this).find('ul').remove();
            $(this).append('<ul></ul>');
            $(this).find('ul').append( '<li><img src="lib/larson_on.svg" alt=""></li>' );
            for (i=0; i<this.nled-1; ++i){
                $(this).find('ul').append( '<li><img src="lib/larson_off.svg" alt=""></li>' );
            }
        }

        this.larson_start = function() {
            this.larson_setup(this.nled);
            this.larson_running = true;
            this.larson_advance_bkw(this);
        }

        this.larson_stop = function(nled) {
            this.larson_running = false;
        }

        function kinkywrap(fn, context) {
            /* kinkywrap(fn, context)
             * preserve context across setTimeout invocations.
             *
             * it makes me feel dirty to have to use this.
             * but it's awesome that it works.
             * so lets call it kinky for the time being. 
             */
            return function() { fn.call(context); }    
        }

        this.larson_advance_bkw = function() {
            $(this).find('ul').append( $(this).find('ul>li:first').remove() );
            if(this.larson_running) {
                setTimeout( --this.cnt  ? kinkywrap(this.larson_advance_bkw, this)
                                        : kinkywrap(this.larson_advance_fwd, this),
                            this.timeout);
            }
            this.cnt = this.cnt ? this.cnt : this.rst-1;
        }

        this.larson_advance_fwd = function() {
            $(this).find('ul').prepend( $(this).find('ul>li:last').remove() );
            if(this.larson_running) {
                setTimeout( --this.cnt  ? kinkywrap(this.larson_advance_fwd, this)
                                        : kinkywrap(this.larson_advance_bkw, this),
                            this.timeout);
            }
            this.cnt = this.cnt ? this.cnt : this.rst-1;
        }

        switch(param){
            case 'start': this.larson_start(); break;
            case 'stop': this.larson_stop(); break;
            default: this.larson_setup(param);
        }

        return this;
    }
}
)( jQuery );

