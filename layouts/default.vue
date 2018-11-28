<template>
<div>
    <header class="header-global">
        <app-header></app-header>
    </header>
    <notification-modal />
    <nuxt />
    <footer class="footer pt-0">
        <app-footer></app-footer>
    </footer>
</div>
</template>

<script>
import appHeader from "@/layouts/AppHeader";
import appFooter from "@/layouts/AppFooter";
import notifications from "@/layouts/custom/Notifications";
export default {
    components: {
        "app-header": appHeader,
        "app-footer": appFooter,
        "notification-modal": notifications
    }
};
</script>

<style>
html {
    font-family: "Open Sans" sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}
*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}
</style>
