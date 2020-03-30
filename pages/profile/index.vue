<template>
  <div class="profile-page">
    <section class="section-profile-cover custom-gradient"></section>
    <section class="section section-hero custom-gradient" v-if="!!currentUser && !!user">
      <div class="container">
        <card class="card-profile mt--300" no-body shadow>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-1">
                <div class="card-profile-image">
                  <a href>
                    <img alt="Profile Pic" class="rounded-circle" v-lazy="currentUser.profile.picture">
                  </a>
                </div>
              </div>
              <div class="col-lg-9 order-lg-2 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-5 mt-lg-0">
                  <span class="ml-2 float-right">
                  
                    <router-link v-if="currentUser.role.includes('participant')" :to="{name: 'profile-update'}" class="btn btn-primary btn-sm">Update</router-link>
                    <router-link v-if="currentUser.role.includes('volunteer')" :to="{name: 'profile-volunteer-update'}" class="btn btn-primary btn-sm">Update</router-link>
                  </span>
                </div>
              </div>
            </div>
            <div class="text-center border-top mt-5 mt-md-3 pt-lg-3">
              <h3 class="pt-0 pt-sm--100 pt-md-4 pt-lg-4">
                <router-link :to="'/profile/'+currentUser.username">{{currentUser.display_name}}</router-link>
              </h3>
              <div class="h6 font-weight-300 text-muted">{{currentUser.profile.location}}</div>
              <div class="mt-4 text-center" v-if="!!team">
                <i class="fa fa-university mr-2"></i>
                <h4 class="text-dark">{{team.institution.name || ""}}</h4>
                <h6 class="text-muted">{{team.institution.address}}</h6>
              </div>
              <div class="border-top" v-if="!!team">
                <i class="mt-4 fa fa-users mr-2"></i>
                <h4>
                  <router-link :to="'/team/'+team._id" class="cursor-pointer text-primary" tag="a">{{team.team_name}}</router-link>
                </h4>
                <div v-if="currentUser._id === team.captain">Team Captain</div>
                <div v-else>Team Member</div>
              </div>
            </div>
            <div class="mt-5 py-2 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9" v-if="!!currentUser.bio">
                  <i class="fas fa-scroll"></i>
                  <h5>Bio</h5>
                  <p>{{currentUser.bio}}</p>
                </div>
              </div>
            </div>
            <template v-if="currentUser.role.includes('volunteer') && currentUser.volunteerFields">
              <div class="mt-5 py-2 border-top text-center" v-if="currentUser.volunteerFields.currentPosition">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <i class="fas fa-briefcase"></i>
                    <h5>Position at Work / Study</h5>
                    <p>{{currentUser.volunteerFields.currentPosition}}</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 py-2 border-top text-center" v-if="currentUser.volunteerFields.currentWorkplace">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <i class="fas fa-university"></i>
                    <h5>Workplace / Institution</h5>
                    <p>{{currentUser.volunteerFields.currentWorkplace}}</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 py-2 border-top text-center" v-if="currentUser.volunteerFields.claimAlmusStatus && currentUser.volunteerFields.claimAlmusStatus.institution">
                <div class="row justify-content-center">
                  <div class="col-lg-9">
                    <i class="fas fa-award"></i>
                    <h5>Claim Alumnus status</h5>
                    <p>{{currentUser.volunteerFields.claimAlmusStatus.institution.name}}</p>
                  </div>
                </div>
              </div>
            </template>
            <div class="mt-5 py-2 border-top text-center" v-if="user.eventParticipated && user.eventParticipated.length">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <i class="fas fa-calendar-week"></i>
                  <h5>Events Participated</h5>
                  <p v-for="event of user.eventParticipated">
                    <span>{{event.name}}</span>
                    <b-dropdown text="Certificate" size="sm" class="m-md-2" variant="outline-warning">
                      <b-dropdown-item @click="generateCertificate('PDF')">PDF</b-dropdown-item>
                      <b-dropdown-item @click="generateCertificate('PNG')">PNG</b-dropdown-item>
                      <b-dropdown-item @click="generateCertificate('JPG')">JPG</b-dropdown-item>
                    </b-dropdown>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
    <script :src="location+'/pdf.js'"></script>
  </div>
</template>

<script>

if(process.client) {
        var htmlToImage = require('html-to-image');
        var converter = require('json-2-csv');
}

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      location: '',
      team: null,
      user: null
    };
  },
  async asyncData({ $axios, error }) {},
  methods: {
    ...mapActions(["getUserTeam","getReq"]),
    saveTeam: async function() {
      if (this.currentUser) {
        try {
          let res = await this.getUserTeam(this.currentUser.username);
          if (res._id) {
            this.team = res;
          } else {
            this.team = null;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    generatePdfPart(value,name, statement = true, ifHref = false, withLocation = true) {
          if (statement && value) {
              let html = value;
              if (ifHref) {
                  const href = (withLocation)?this.location+value:value;
                  console.log('name', href)
                  html = `<a target="_blank" href="${href}" download="${value}">Download file</a>`
              }
              return `
              <tr>
                    <td width="220px">${name}</td>
                    <td>${html}</td>
               </tr>
            `;
          }
          return '';
      },
    generatePdfHead(name, type = 'h6') {
          return ` <tr>
                        <td colspan="2">
                          <${type}>${name}</${type}>
                        </td>
                  </tr> `;
    },
    generateCertificate(type) {
        let html =
            `<div class="pdf-wrapper">
                     <h3>${this.user.display_name} Certificate</h3>
                <table border="1">
                  <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>${this.user.display_name}</td>
                  </tr>
                `;
              if(this.user.team) {
                  html += this.generatePdfPart(this.user.team.team_name,'Team Name', this.user.team && this.user.team.team_name);
                  html += this.generatePdfPart(this.user.team.institution.name, 'Institution Name', this.user.team && this.user.team.institution);
              }
          html += `
                    </tbody>
                  </table>
           </div>`;

        if(this.currentUser.role.includes('volunteer')) {
             html =
                `<div class="pdf-wrapper">
                     <h3>${this.user.display_name} Certificate</h3>
                <table border="1">
                  <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>${this.user.display_name}</td>
                  </tr>
                `;
            html += this.generatePdfPart(this.user.volunteerFields.currentPosition,'Volunteer Role at event', this.user.volunteerFields && this.user.volunteerFields.currentPosition);
            html += `
                  </tbody>
                </table>
             </div>`;
        }

          const element = document.createElement('div');
          element.innerHTML = html;

          switch (type) {
              case 'PDF':
                  const options = {
                      filename:     this.user.display_name,
                      image:        { type: 'jpeg', quality: 1 },
                  }

                  window.html2pdf().from(element).set(options).save()
                  break;
              case 'PNG':
                  htmlToImage.toPng(element, {
                      style: {
                          'text-align':'center',
                          'display':'flex',
                          'justify-content':'center',
                          'margin': '10px'
                      },
                      width: 600,
                      height:500,
                      backgroundColor:'#fff'
                  }).then( dataUrl => {
                      var link = document.createElement('a');
                      link.download = `${this.user.display_name}.png`;
                      link.href = dataUrl;
                      link.click();
                  });
                  break;
              case 'JPG':
                  htmlToImage.toJpeg(element, {
                      style: {
                          'text-align':'center',
                          'display':'flex',
                          'justify-content':'center',
                          'margin': '10px'
                      },
                      width: 600,
                      height:500,
                      backgroundColor:'#fff'
                  }).then( dataUrl => {
                      var link = document.createElement('a');
                      link.download = `${this.user.display_name}.jpeg`;
                      link.href = dataUrl;
                      link.click();
                  });
                  break;
          }
   },
    getUser: async function() {
          if (this.currentUser) {
              try {
                  let res = await this.getReq({
                      url: '/api/user/profile/' + this.currentUser.username
                  });

                  if(res.success) {
                      this.user = res.user;
                  }
              } catch (err) {
                  console.log(err);
              }
          }
      },
  },
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  },
  created() {
    this.$nextTick( async () => {
      this.saveTeam();
    })
  },
  mounted() {
    this.$nextTick(function () {
        this.location = window.location.origin;
        this.getUser();
    });
  }
};
</script>
