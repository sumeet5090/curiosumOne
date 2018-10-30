<template>
<div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
        <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </section>
    <section class="section section-skew">
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
                                <base-button type="info" size="sm" class="mr-4">Connect</base-button>
                                <router-link tag="a" type="default" class="btn btn-default btn-sm float-right" to="/profile/update">Update</router-link>
                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-1">
                            <div class="card-profile-stats d-flex justify-content-center">
                                <div>
                                    <span class="heading" v-if="!!getTeam">{{getTeam}}</span>
                                    <span class="description" v-if="!!getTeam">Team</span>
                                </div>
                                <div>
                                    <span class="heading">10</span>
                                    <span class="description">Photos</span>
                                </div>
                                <div>
                                    <span class="heading">89</span>
                                    <span class="description">Comments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-0 mt-md-5 pt-lg-5">
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
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            team: {

            }
        }
    },
    computed: {
        ...mapGetters["currentUser"]
    }
};
</script>

<style lang="scss">
</style>
