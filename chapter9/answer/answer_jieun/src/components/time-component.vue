<template>
    <section>
        <nav>
            <ul>
                <li>
                    <a href="#" @click="changeMenu('keepbutton')">계속시간찍기</a>
                </li>
                <li>
                    <a href="#" @click="changeMenu('oncebutton')">한번만찍기</a>
                </li>
            </ul>
        </nav>
        <div class="container">
            <keep-alive include="keepbutton,oncebutton">
                <!-- keep alive 모르겠다...!-->
                <component v-bind:is="currentView"></component>
            </keep-alive>
        </div>
    </section>
</template>
<script type="text/javascript">
    import keepbutton from './button-component-keep.vue'
    import oncebutton from './button-component-once.vue'

    export default {
        name : 'timestamp',
        components: { keepbutton, oncebutton },
        data() {
            return {
                currentView : null
            }
        },

        methods: {
            changeMenu(view) {
                this.currentView = view;
            }
        }
    }
</script>
<style>
   label {
       border: 1px solid #ddd;
       padding: 5px 20px;
       cursor: pointer;
   }
    input[type='radio'] {
        display: none;
    }
</style>
