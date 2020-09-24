<template>

<div class="search-status">
    <div class="search-status__loader"><div :class="['search-status__loader-bar', {'search-status__loader-bar_is-loaded':progress==100 }]" :style="`width: ${progress}%`"></div></div>
    <div class="search-status__content">
        <div class="search-status__item">
            {{ $t('results.progressbar.progress') }} <span>{{ parseInt(progress) }}%</span>
        </div>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name:'progressbar',
    data(){
        return  {
           timerId: null,
           progress: 0,
        }
    }, 
    methods: {
       
    },
    mounted() {
        clearInterval(this.timerId);
        this.progress = 0;
    
        var v = 0.8, a = 0.005*10;
    
        this.timerId = setInterval(() => {            
            a += 0.000031;
            v -= v*a;
            this.progress += v;

            if ( this.progress >= 98) clearInterval(this.timerId);   
            
        }, 250);
    
    }
}
</script>


<style scoped>

/* progress */
.search-status {
    margin: 2% 0;

    position: relative;
}

.search-status__content {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 1;
    padding: 15px 2%;
    position: relative;
}

.search-status__loader-bar {
    display: block;
    height: 100%;
    -webkit-transition: width .3s ease-in-out;
    -o-transition: width .3s ease-in-out;
    transition: width .3s ease-in-out;
    background-color: #8cb930;
    background-size: 16px 16px;
    background-image: -o-linear-gradient(315deg, hsla(0, 0%, 100%, .15) 25%, transparent 25%, transparent 50%, hsla(0, 0%, 100%, .15) 50%, hsla(0, 0%, 100%, .15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(135deg, hsla(0, 0%, 100%, .15) 25%, transparent 0, transparent 50%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .15) 75%, transparent 0, transparent);
    -webkit-animation: animate-loader-stripes 1s linear infinite;
    animation: animate-loader-stripes 1s linear infinite;
}
.search-status__loader-bar_is-loaded {
    background-image: -o-linear-gradient(315deg, transparent 10%, hsla(0, 0%, 100%, .2) 20%, transparent 30%, transparent 100%);
    background-image: linear-gradient(135deg, transparent 10%, hsla(0, 0%, 100%, .2) 20%, transparent 30%, transparent);
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-animation: animate-loader-done 2s ease-out infinite;
    animation: animate-loader-done 2s ease-out infinite;
}


@-webkit-keyframes animate-loader-stripes {
    0% {
        background-position: 32px 0
    }

    to {
        background-position: 0 0
    }
}

@keyframes animate-loader-stripes {
    0% {
        background-position: 32px 0
    }

    to {
        background-position: 0 0
    }
}

@-webkit-keyframes animate-loader-done {
    0% {
        background-position: -300px 0
    }

    80% {
        background-position: -300px 0
    }

    to {
        background-position: 1260px 0
    }
}

@keyframes animate-loader-done {
    0% {
        background-position: -300px 0
    }

    80% {
        background-position: -300px 0
    }

    to {
        background-position: 1260px 0
    }
}

@-webkit-keyframes animate-search-status-text {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

@keyframes animate-search-status-text {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}




.search-status__item-btn {
    width: 218px;
    color: #fff;
    background: #2db29f;
    cursor: pointer;
    padding: 5px 23px;
    border: none;
    font-size: 18px;
    border-radius: 4px;
    outline: none;
}
.search-status__loader {
    display: block;
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #e1e1f0;
    animation: animate-search-status-text .15s
}

</style>