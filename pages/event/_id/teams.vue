<template>
<section class="section">
    <div class="container">
        <b-row class="justify-content-center">
            <div class="display-4">
                Registered Teams for <strong class="text-primary">{{event.name}}</strong>
            </div>
        </b-row>
        <b-row class="justify-content-center">
            <base-pagination :page-count="pageCount" v-model="table.currentPage"></base-pagination>
        </b-row>
        <b-row>
            <b-table outlined responsive bordered hover :items="teams" :fields="fields" :per-page="table.perPage" :current-page="table.currentPage">
                <template slot="category" slot-scope="data">
                    <div class>
                        <img v-lazy="combustion_icon" alt="Combustion" class="img-thumbnail icon-category" v-show="data.item.category == 'combustion'"/>
                        <img v-lazy="electric_icon" alt="Electric" class="img-thumbnail icon-category" v-show="data.item.category == 'electric'"/>
                </div>
                </template>
                <template slot="team_name" slot-scope="data">
                    <router-link :to="{name: 'team-id', params: {id: data.item._id}}" tag="a" class="text-primary">{{data.item.team_name}}</router-link>
                </template>
                <template slot="institution" slot-scope="data">
                    <truncate action-class="truncated-less-sign" clamp=" ... " :length="54" less="[hide]" :text="(data.item.institution.name || '').toString()"></truncate>
                </template>
                <template slot="social" slot-scope="data">
                    <a v-if="data.item.website_url" :href="data.item.website_url" target="_blank"><icon name="fa fa-link" color="dark" size="sm"></icon></a>
                    <a v-if="data.item.social.facebook" :href="data.item.social.facebook" target="_blank"><icon name="fa fa-facebook-official" style="color: #3B5999"  size="sm"></icon></a>
                    <a v-if="data.item.social.twitter" :href="data.item.social.twitter" target="_blank"><icon name="fa fa-twitter" style="color: #1DA1F2"  size="sm"></icon></a>
                    <a v-if="data.item.social.instagram" :href="data.item.social.instagram" target="_blank"><icon name="fa fa-instagram" color="danger" size="sm"></icon></a>
                </template>
            </b-table>
        </b-row>

    </div>
</section>
</template>

<script>
import truncate from "vue-truncate-collapsed";
export default {
    components: {
        truncate
    },
    computed: {
        pageCount: function () {
            if (this.teams) {
                let x = this.teams.length / this.table.perPage;
                let y = parseInt(x);
                return x == y ? y : y + 1;
            } else {
                return 1;
            }
        }
    },
    data() {
        return {
            table: {
                currentPage: 1,
                perPage: 10
            },
            // items: require('@/data/exampleteams'),
            combustion_icon: require("@/assets/images/icons/category/combustion.svg"),
            electric_icon: require("@/assets/images/icons/category/electric.svg"),
            fields: [{
                    label: "",
                    key: "category",
                    sortable: true
                },
                {
                    label: " ",
                    key: "car_number",
                    sortable: true
                },
                {
                    sortable: true,
                    label: " ",
                    key: "team_name"
                },
                {
                    key: "institution",
                    label: " ",
                    sortable: true
                },
                {
                    sortable: true,
                    label: " ",
                    key: "location"
                },
                {
                    sortable: true,
                    label: " ",
                    key: "country"
                },
                {
                    // sortable: true,
                    label: " ",
                    key: "social"
                },
                {}
            ]
        };
    },
    async asyncData({
        $axios,
        params,
        error
    }) {
        try {
            const {
                data
            } = await $axios.get(`/api/event/${params.id}/teams`, {
                validateStatus: status => {
                    return status < 400;
                }
            });
            let event_res = await $axios.get(`/api/event/${params.id}`, {
                validateStatus: status => {
                    return status < 400;
                }
            });
            return {
                event: event_res.data.event,
                isLoaded: data.success,
                teams: data.teams
            };
        } catch (err) {
            console.log(err);
            error({
                message: "Teams not found",
                statusCode: 404
            });
        }
    }
};
</script>

<style lang="scss">
.truncated_less_sign {
    color: #5e72e4;
}

.icon-category {
    width: auto;
    height: 32px;
    background: none !important;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    min-width: 24px;
}

.table {

    // border: 0.05rem solid $dark;
    th {
        padding: 0;
    }

    td {
        padding: 0.45rem;
        vertical-align: middle;
    }
}

td>.icon.icon-shape {
    padding: 0;
    margin: 0;
}
</style>
