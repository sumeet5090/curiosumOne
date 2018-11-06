<template>
<div class="profile-page" v-if="!!isAuthenticated">
    <section class="section-profile-cover custom-gradient"> <!-- TODO: Add Gradient -->
    </section>
    <section class="section custom-gradient" v-if="!!currentUser">
        <div class="container">
            <card shadow class="card-profile mt--300" no-body>
                <div class="px-4">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                            <div class="card-profile-image">
                                <a href="">
                                    <img v-lazy="currentUser.profile.picture" class="rounded-circle">
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                            <div class="card-profile-actions py-4 mt-lg-0">
                                <span class="mr-auto"><base-button type="primary" size="sm">Btn 1</base-button></span>
                                <span class="ml-2 float-right"><base-button type="primary" size="sm">Btn 2</base-button></span>
                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-1">
                            <div class="card-profile-stats d-flex justify-content-center">
                                <div>
                                    <span class="heading">{{getTeam}}</span>
                                    <span class="description">Team</span>
                                </div>
                                <div>
                                    <span class="heading">89</span>
                                    <span class="description">Comments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-0 mt-md-3 pt-lg-3">
                        <h3 class="pt-0 pt-sm--100 pt-md-4 pt-lg-4">{{currentUser.display_name}}</h3>
                        <div class="h6 font-weight-300">{{currentUser.profile.location}}</div>
                        <div class="h6 mt-4"><i class="mr-2"></i></div>
                        <div>University of Computer Science</div>
                    </div>
                    <div class="mt-5 py-5 border-top text-center">
                        <div class="row justify-content-center">
                            <div class="col-lg-9">
                                <p>{{currentUser.bio}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </section>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from "vuex";
export default {
    data() {
        return {};
    },
    async asyncData({$axios, error}){
        
    },
    methods: {},
    computed: {
        ...mapGetters(["currentUser", "isAuthenticated"]),
    }
};
</script>

<style lang="scss">
</style>
