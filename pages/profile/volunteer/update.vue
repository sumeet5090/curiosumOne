<template>
  <div class="custom-gradient">
    <no-ssr>
      <section v-if="user" class="section">
        <b-container>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <card>
                <b-form @submit.prevent="onSubmit" @reset="onReset" id="my-form">
                  <b-form-group  label="Current Position at Work / Study:" label-for="input-1">
                    <b-form-input :readonly="user.infoSubmited" :state="Boolean(form.volunteerFields.currentPosition)" id="input-1" type="text" v-model="form.volunteerFields.currentPosition"  placeholder="Current Position at Work / Study">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group label="Current Workplace / Institution:" label-for="input-2">
                    <b-form-input :readonly="user.infoSubmited" :state="Boolean(form.volunteerFields.currentWorkplace)" id="input-2" type="text" v-model="form.volunteerFields.currentWorkplace"  placeholder="Current Workplace / Institution">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Highest level of study attained:"
                    description="H.S.C, S.S.C, Certificate, College Diploma, Bachelors Degree, Masters Degree, Doctoral Degree"
                    label-for="input-3">
                    <b-form-input
                      :readonly="user.infoSubmited"
                      id="input-3"
                      :state="Boolean(form.volunteerFields.highestLvl)"
                      v-model="form.volunteerFields.highestLvl"
                      type="text"
                      placeholder="Highest level of study attained">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Postal Mailing Address:"
                    description="field box for Address 1, Address 2, City, State, PIN Code, Country"
                    label-for="input-4">
                    <b-form-input
                      :readonly="user.infoSubmited"
                      id="input-4"
                      :state="Boolean(form.volunteerFields.postalAddress)"
                      v-model="form.volunteerFields.postalAddress"
                      type="text"
                      placeholder="Postal Mailing Address">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="form-email" label="Email:" label-for="form-email--input" description="We'll never share your email with anyone else.">
                    <b-form-input :readonly="user.infoSubmited || !isAdmin" id="form-email--input" v-model="form.email" type="text" placeholder="Email">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="form-phonenumber" label="Phone number:" label-for="form-phonenumber--input" description="We'll never share your phone number with anyone else.">
                    <div class="display-flex-form">
                      <b-form-select  :disabled="user.infoSubmited" :state="Boolean(form.phone_parts.code)" @change="changePhoneNumber()" v-model="form.phone_parts.code" style="width: 120px; margin-right:2px">
                        <option :selected="true" :value="null">Code</option>
                        <option v-for="item in countryCodes" :value="item.dial_code">{{item.code}} {{item.dial_code}}</option>:
                      </b-form-select>
                      <b-form-input :readonly="user.infoSubmited" :state="Boolean(form.phone_parts.number)" @change="changePhoneNumber()" id="form-phonenumber--input" type="text" v-model="form.phone_parts.number" placeholder="Phone number">
                      </b-form-input>
                    </div>
                  </b-form-group>
                  <b-form-group id="form-bio" label="Bio:" label-for="form-bio--input" description="Talk about yourself.">
                    <b-form-textarea :readonly="user.infoSubmited" :state="Boolean(form.bio)" id="form-bio--input" type="text" v-model="form.bio" placeholder="Bio" :rows="4" max-rows="6" min-rows="3">
                    </b-form-textarea>
                  </b-form-group>
                 <!-- <b-form-group id="form-picture-url" label="Profile picture:" label-for="form-picture-url&#45;&#45;input" description="Link to a new profile picture.">
                    <b-form-input id="form-picture-url&#45;&#45;input" type="url" v-model="form.link_to_logo"  placeholder="https://example.website.com/images/demo.jpg">
                    </b-form-input>
                  </b-form-group>-->
                  <b-form-group label="Claim Alumnus status:" label-for="input-claimAlmusStatus">
                    <div>
                      <b-form-select :disabled="user.infoSubmited"  :state="Boolean(form.volunteerFields.claimAlmusStatus)" id="input-claimAlmusStatus"  v-model="form.volunteerFields.claimAlmusStatus">
                        <option :value="null">Please select an option</option>
                        <option v-for="team of teams" :value="team._id">{{team.team_name}}</option>
                      </b-form-select>
                    </div>
                  </b-form-group>
                  <b-form-group label="Positions interested in:" label-for="input-positionInterestedIn">
                    <div>
                      <b-form-select :disabled="user.infoSubmited" :state="Boolean(form.volunteerFields.positionInterestedIn)" id="input-positionInterestedIn"  v-model="form.volunteerFields.positionInterestedIn">
                        <option :value="null">Please select an option</option>
                        <option value="Ground Volunteer">Ground Volunteer</option>
                        <option value="Registration">Registration</option>
                        <option value="Junior Tech - Combustion">Junior Tech - Combustion</option>
                        <option value="Junior Tech - Electric">Junior Tech - Electric</option>
                        <option value="Junior Tech - Hot Pits">Junior Tech - Hot Pits</option>
                        <option value="Design Judge">Design Judge</option>
                        <option value="Business Judge">Business Judge</option>
                        <option value="Cost Judge">Cost Judge</option>
                        <option value="Dynamics - Track & Timing">Dynamics - Track & Timing</option>
                      </b-form-select>
                    </div>
                  </b-form-group>
                 <!-- <b-form-group id="form-roleOnTeam" label="Role on Team:" label-for="form-roleOnTeam&#45;&#45;input" description="Your role on team.">
                    <b-form-input :state="Boolean(form.roleOnTeam)" id="form-roleOnTeam&#45;&#45;input" v-model="form.roleOnTeam" type="text" placeholder="Role on Team">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="form-yearOfStudy" label="Current Year of Study:" label-for="form-yearOfStudy&#45;&#45;input" >
                    <b-form-input :state="Boolean(form.yearOfStudy)" id="form-yearOfStudy&#45;&#45;input" v-model="form.yearOfStudy" type="number" placeholder="Current Year of Study">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="form-programOFStudy" label="Current Program of Study:" label-for="form-programOFStudy&#45;&#45;input" >
                    <b-form-input :state="Boolean(form.programOFStudy)" id="form-programOFStudy&#45;&#45;input" v-model="form.programOFStudy" type="text" placeholder="Current Program of Study">
                    </b-form-input>
                  </b-form-group>-->
                  <b-form-group id="form-eventOfParticipation" label="Select Event of Participation:" label-for="form-eventOfParticipation--input" >
                    <b-form-select :disabled="user.infoSubmited"  :state="Boolean(form.eventOfParticipation)" id="form-eventOfParticipation--input" v-model="form.eventOfParticipation">
                      <option :value="null">Please select an option</option>
                      <option v-for="event of events" :value=event._id>{{event.name}}</option>
                    </b-form-select>
                  </b-form-group>
                  <template v-if="form.eventOfParticipation == specialEvent">
                    <b-form-group id="form-formulaBharatDetails-fullName" label="Full Name:" label-for="form-formulaBharatDetails-fullName--input"  description="as  to be printed on certificate">
                      <b-form-input :readonly="user.infoSubmited"  :state="Boolean(form.formulaBharatDetails.fullName)"   id="form-formulaBharatDetails-fullName--input" v-model="form.formulaBharatDetails.fullName" type="text" placeholder="Full Name">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="form-formulaBharatDetails-age" label="Age:" label-for="form-formulaBharatDetails-age--input" >
                      <b-form-input :readonly="user.infoSubmited"  :state="Boolean(form.formulaBharatDetails.age.value)"  id="form-formulaBharatDetails-age--input" v-model="form.formulaBharatDetails.age.value" type="number" placeholder="Age">
                      </b-form-input>
                    </b-form-group>

                    <template v-if="parseInt(form.formulaBharatDetails.age.value) < 18">
                      <b-form-group label="Signed Under 18 Waiver:" description="Upload signed Under 18 Waiver. [Max File size 200kB / .pdf, .jpg, .png]" >
                        <b-form-file
                          :disabled="user.infoSubmited"
                          accept="application/pdf,image/x-png,image/jpeg"
                          @change="fileChange($event,'age')"
                          :state="Boolean(form.formulaBharatDetails.age.file)"
                          placeholder="Signed Under 18 Waiver..."
                          drop-placeholder="Drop file here..."
                        ></b-form-file>
                        <a href="/pdf/FB_UNDER18_Participant_Waiver_2020.pdf" download="Signed Under 18 Waiver">Click here to Download waiver</a>
                        <template v-if="Boolean(form.formulaBharatDetails.age.file)">
                          <div class="mt-2">
                            <b-link :href="form.formulaBharatDetails.age.file" :download="form.formulaBharatDetails.age.file">Download file</b-link>
                            <b-button size="sm" variant="danger" @click="removeFIle(form.formulaBharatDetails.age)">Remove</b-button>
                          </div>
                        </template>
                      </b-form-group>
                    </template>

                    <b-form-group id="form-formulaBharatDetails-gender" label="Gender:" label-for="form-formulaBharatDetails-gender--input" >
                      <b-form-select  :disabled="user.infoSubmited"  :state="Boolean(form.formulaBharatDetails.gender)"  id="form-formulaBharatDetails-gender--input" v-model="form.formulaBharatDetails.gender">
                        <option :value="null">Please select an option</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </b-form-select>
                    </b-form-group>
                    <b-form-group  id="form-formulaBharatDetails-dietaryInformation" label="Dietary Information:" label-for="form-formulaBharatDetails-dietaryInformation--input" >
                      <b-form-select  :disabled="user.infoSubmited" :state="Boolean(form.formulaBharatDetails.dietaryInformation)" id="form-formulaBharatDetails-dietaryInformation--input" v-model="form.formulaBharatDetails.dietaryInformation">
                        <option :value="null">Please select an option</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-Vegetarian">Non-Vegetarian</option>
                      </b-form-select>
                    </b-form-group>
                    <h5>Emergency Contact Details</h5>
                    <p>Immediate Family Parent, Sibling, Guardian above 18 years. Not Team Captain</p>
                    <b-form-group id="form-formulaBharatDetails-emergencyContactDetails-contactName" label="Contact Name:" label-for="form-formulaBharatDetails-emergencyContactDetails-contactName--input" description="Emergency Contact Name">
                      <b-form-input  :readonly="user.infoSubmited"  :state="Boolean(form.formulaBharatDetails.emergencyContactDetails.contactName)"  id="form-formulaBharatDetails-emergencyContactDetails-contactName--input" v-model="form.formulaBharatDetails.emergencyContactDetails.contactName" type="text" placeholder="Contact Name" >
                      </b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Phone number:"
                      description="Emergency Contact Phone Number">
                      <div class="display-flex-form">
                        <b-form-select
                          :disabled="user.infoSubmited"
                          :state="Boolean(form.formulaBharatDetails.emergencyContactDetails.phone_parts.code)"
                          @change="changeContactNumber()"
                          v-model="form.formulaBharatDetails.emergencyContactDetails.phone_parts.code"
                          style="width: 120px; margin-right:2px">
                          <option :selected="true" :value="null">Code</option>
                          <option v-for="item in countryCodes" :value="item.dial_code">{{item.code}} {{item.dial_code}}</option>:
                        </b-form-select>
                        <b-form-input :readonly="user.infoSubmited" :state="Boolean(form.formulaBharatDetails.emergencyContactDetails.phone_parts.number)" @change="changeContactNumber()" type="text" v-model="form.formulaBharatDetails.emergencyContactDetails.phone_parts.number" placeholder="Phone number">
                        </b-form-input>
                      </div>
                    </b-form-group>
                    <h5>Medical / Travel Insurance Details</h5>
                    <p>All Participants at Formula Bharat are  to have medical insurance coverage. Life insurance coverage does not apply</p>
                    <b-form-group id="form-formulaBharatDetails-medicalInsurance.name" label="Provider Name:" label-for="form-formulaBharatDetails-medicalInsurance.name--input" description="Medical / Travel Insurance Provider Name" >
                      <b-form-input :readonly="user.infoSubmited" :state="Boolean(form.formulaBharatDetails.medicalInsurance.name)"  id="form-formulaBharatDetails-medicalInsurance.name--input" v-model="form.formulaBharatDetails.medicalInsurance.name" type="text" placeholder="Provider Name">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="form-formulaBharatDetails-medicalInsurance.number" label="Coverage Number:" label-for="form-formulaBharatDetails-medicalInsurance.number--input" description="Medical / Travel Insurance Coverage Number" >
                      <b-form-input :readonly="user.infoSubmited" :state="Boolean(form.formulaBharatDetails.medicalInsurance.number)"  id="form-formulaBharatDetails-medicalInsurance.number--input" v-model="form.formulaBharatDetails.medicalInsurance.number" type="text" placeholder="Coverage Number">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group id="form-formulaBharatDetails-medicalInsurance.file" label="Insurance Coverage proof:" label-for="form-formulaBharatDetails-medicalInsurance.file--input" description="Upload Insurance Coverage proof [Max File size 200kB / .pdf, .jpg, .png]" >
                      <b-form-file
                        :disabled="user.infoSubmited"
                        accept="application/pdf,image/x-png,image/jpeg"
                        @change="fileChange($event,'medicalInsurance')"
                        :state="Boolean(form.formulaBharatDetails.medicalInsurance.file)"
                        placeholder="Insurance Coverage proof..."
                        drop-placeholder="Drop file here..."
                      ></b-form-file>
                      <template v-if="Boolean(form.formulaBharatDetails.medicalInsurance.file)">
                        <div class="mt-2">
                          <b-link :href="form.formulaBharatDetails.medicalInsurance.file" :download="form.formulaBharatDetails.medicalInsurance.file">Download file</b-link>
                          <b-button size="sm" variant="danger" @click="removeFIle(form.formulaBharatDetails.medicalInsurance)">Remove</b-button>
                        </div>
                      </template>
                    </b-form-group>
                    <b-form-group id="form-ifDesignatedDriver.answer" label='If you are one of the designated drivers on the team, please select "Yes"' label-for="form-ifDesignatedDriver.answer--input" description="Are you one of the Designated Drivers for your team at the competition?">
                      <b-form-select  :disabled="user.infoSubmited" :state="(form.formulaBharatDetails.ifDesignatedDriver.answer!=null)" id="form-ifDesignatedDriver.answer--input" v-model="form.formulaBharatDetails.ifDesignatedDriver.answer">
                        <option :value="null">Please select an option</option>
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </b-form-select>
                    </b-form-group>

                    <template v-if="form.formulaBharatDetails.ifDesignatedDriver.answer">
                      <b-form-group id="form-formulaBharatDetails-ifDesignatedDriver.file" label="Insurance Coverage proof:" label-for="form-formulaBharatDetails-ifDesignatedDriver.file--input" description="Upload Drivers' License [Max File size 100kB / .pdf, .jpg, .png]" >
                        <b-form-file
                          :disabled="user.infoSubmited"
                          accept="application/pdf,image/x-png,image/jpeg"
                          @change="fileChange($event,'ifDesignatedDriver')"
                          :state="Boolean(form.formulaBharatDetails.ifDesignatedDriver.file)"
                          placeholder="Insurance Coverage proof..."
                          drop-placeholder="Drop file here..."
                        ></b-form-file>
                        <template v-if="Boolean(form.formulaBharatDetails.ifDesignatedDriver.file)">
                          <div class="mt-2">
                            <b-link :href="form.formulaBharatDetails.ifDesignatedDriver.file" :download="form.formulaBharatDetails.ifDesignatedDriver.file">Download file</b-link>
                            <b-button size="sm" variant="danger" @click="removeFIle(form.formulaBharatDetails.ifDesignatedDriver)">Remove</b-button>
                          </div>
                        </template>
                      </b-form-group>
                    </template>
                    <b-form-group>
                      <b-form-checkbox
                        :disabled="user.infoSubmited"
                        id="checkbox-1"
                        :state="form.formulaBharatDetails.individualAgree == 'Yes'"
                        v-model="form.formulaBharatDetails.individualAgree"
                        name="checkbox-1"
                        value="Yes"
                        unchecked-value=""
                      >
                        I accept the T&C (<a download="FORMULA BHARAT General Waiver - Portal.pdf" href="/pdf/FORMULA BHARAT General Waiver - Portal.pdf"> </a>)
                      </b-form-checkbox>
                    </b-form-group>
                  </template>
                  <b-alert type="danger" v-if="errors.length > 0">
                    <div v-for="err in errors" >{{err}}</div>
                  </b-alert>
                  <b-alert type="success" v-if="success_msg">
                    <div>{{success_msg}}</div>
                  </b-alert>
                  <template v-if="!user.infoSubmited">
                    <b-button type="submit" variant="primary">Update</b-button>
                    <b-button type="button"  @click="submitParticipantInfo()" variant="success">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                  </template>
                  <b-button type="button" variant="warning" @click="generatePDF()">Export</b-button>
                  <!--<b-dropdown text="Certificate" class="m-md-2" variant="outline-warning">
                    <b-dropdown-item @click="generateCertificate('PDF')">PDF</b-dropdown-item>
                    <b-dropdown-item @click="generateCertificate('PNG')">PNG</b-dropdown-item>
                    <b-dropdown-item @click="generateCertificate('JPG')">JPG</b-dropdown-item>
                  </b-dropdown>-->
<!--                  <b-button v-if="user.team" type="button" variant="warning" @click="generateCertificate()">Certificate</b-button>-->
                </b-form>
              </card>
              <div class="csv-collapse-wrapper">
                <b-button v-b-toggle.collapse-csv variant="outline-info" size="sm" class="collapse-btn">Download CSV or upload for edit info</b-button>
                <b-collapse id="collapse-csv" class="mt-2">
                  <div class="csv-collapse">
                    <b-button type="button" variant="success" @click="exportCsv()">Download</b-button>
                    <template  v-if="!user.infoSubmited">
                      <span>OR</span>
                      <div class="upload-csv-wrapper">
                        <b-form-group>
                          <b-form-file
                            v-model="csvFile"
                            accept=".csv"
                            ref="file-input"
                            @change="chooseCsv($event)"
                            placeholder="Upload CSV..."
                            drop-placeholder="Drop file here..."
                          ></b-form-file>
                        </b-form-group>
                        <template v-if="csvFile">
                          <b-button squared variant="outline-success" @click="uploadCsv()"><i class="fas fa-check"></i></b-button>
                          <b-button squared variant="outline-danger"  @click="removeCsv()"><i class="fas fa-minus"></i></b-button>
                        </template>
                      </div>
                    </template>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </b-container>
      </section>
    </no-ssr>
    <script :src="location+'/pdf.js'"></script>
  </div>
</template>
<script>
    if(process.client) {
       var htmlToImage = require('html-to-image');
    }
    import {
        mapGetters,
        mapActions
    } from "vuex";
    export default {
        data() {
            return {
                location: '',
                isAdmin: false,
                validate: ['bio','volunteerFields','eventOfParticipation'],
                isValid: true,
                csvFile: null,
                form: {
                    display_name: "",
                    bio: "",
                    phone_number: "",
                    link_to_logo: "",
                    gender: "",
                    email: "",
                    userType: "",
                    roleOnTeam: "",
                    yearOfStudy: null,
                    programOFStudy: "",
                    eventOfParticipation: null,
                    formulaBharatDetails: {
                        fullName: "",
                        age: {
                            value: null,
                            file: ""
                        },
                        gender: "",
                        dietaryInformation: "",
                        emergencyContactDetails: {
                            contactName: "",
                            contactPhoneNumber: "",
                            phone_parts: {
                                code: "",
                                number: "",
                            }
                        },
                        medicalInsurance: {
                            name: "",
                            number: "",
                            file: "",
                        },
                        ifDesignatedDriver: {
                            answer: null,
                            file: ""
                        },
                        individualAgree: ""
                    },
                    phone_parts: {
                        code: '',
                        number: ''
                    },
                    volunteerFields: {
                        currentPosition: "",
                        currentWorkplace: "",
                        highestLvl: "",
                        postalAddress: "",
                        claimAlmusStatus: "",
                        positionInterestedIn: ""
                    }
                },
                user: {},
                success_msg: null,
                errors: [],
                countryCodes: [
                    {
                        "name": "Afghanistan",
                        "dial_code": "+93",
                        "code": "AF"
                    },
                    {
                        "name": "Aland Islands",
                        "dial_code": "+358",
                        "code": "AX"
                    },
                    {
                        "name": "Albania",
                        "dial_code": "+355",
                        "code": "AL"
                    },
                    {
                        "name": "Algeria",
                        "dial_code": "+213",
                        "code": "DZ"
                    },
                    {
                        "name": "AmericanSamoa",
                        "dial_code": "+1684",
                        "code": "AS"
                    },
                    {
                        "name": "Andorra",
                        "dial_code": "+376",
                        "code": "AD"
                    },
                    {
                        "name": "Angola",
                        "dial_code": "+244",
                        "code": "AO"
                    },
                    {
                        "name": "Anguilla",
                        "dial_code": "+1264",
                        "code": "AI"
                    },
                    {
                        "name": "Antarctica",
                        "dial_code": "+672",
                        "code": "AQ"
                    },
                    {
                        "name": "Antigua and Barbuda",
                        "dial_code": "+1268",
                        "code": "AG"
                    },
                    {
                        "name": "Argentina",
                        "dial_code": "+54",
                        "code": "AR"
                    },
                    {
                        "name": "Armenia",
                        "dial_code": "+374",
                        "code": "AM"
                    },
                    {
                        "name": "Aruba",
                        "dial_code": "+297",
                        "code": "AW"
                    },
                    {
                        "name": "Australia",
                        "dial_code": "+61",
                        "code": "AU"
                    },
                    {
                        "name": "Austria",
                        "dial_code": "+43",
                        "code": "AT"
                    },
                    {
                        "name": "Azerbaijan",
                        "dial_code": "+994",
                        "code": "AZ"
                    },
                    {
                        "name": "Bahamas",
                        "dial_code": "+1242",
                        "code": "BS"
                    },
                    {
                        "name": "Bahrain",
                        "dial_code": "+973",
                        "code": "BH"
                    },
                    {
                        "name": "Bangladesh",
                        "dial_code": "+880",
                        "code": "BD"
                    },
                    {
                        "name": "Barbados",
                        "dial_code": "+1246",
                        "code": "BB"
                    },
                    {
                        "name": "Belarus",
                        "dial_code": "+375",
                        "code": "BY"
                    },
                    {
                        "name": "Belgium",
                        "dial_code": "+32",
                        "code": "BE"
                    },
                    {
                        "name": "Belize",
                        "dial_code": "+501",
                        "code": "BZ"
                    },
                    {
                        "name": "Benin",
                        "dial_code": "+229",
                        "code": "BJ"
                    },
                    {
                        "name": "Bermuda",
                        "dial_code": "+1441",
                        "code": "BM"
                    },
                    {
                        "name": "Bhutan",
                        "dial_code": "+975",
                        "code": "BT"
                    },
                    {
                        "name": "Bolivia, Plurinational State of",
                        "dial_code": "+591",
                        "code": "BO"
                    },
                    {
                        "name": "Bosnia and Herzegovina",
                        "dial_code": "+387",
                        "code": "BA"
                    },
                    {
                        "name": "Botswana",
                        "dial_code": "+267",
                        "code": "BW"
                    },
                    {
                        "name": "Brazil",
                        "dial_code": "+55",
                        "code": "BR"
                    },
                    {
                        "name": "British Indian Ocean Territory",
                        "dial_code": "+246",
                        "code": "IO"
                    },
                    {
                        "name": "Brunei Darussalam",
                        "dial_code": "+673",
                        "code": "BN"
                    },
                    {
                        "name": "Bulgaria",
                        "dial_code": "+359",
                        "code": "BG"
                    },
                    {
                        "name": "Burkina Faso",
                        "dial_code": "+226",
                        "code": "BF"
                    },
                    {
                        "name": "Burundi",
                        "dial_code": "+257",
                        "code": "BI"
                    },
                    {
                        "name": "Cambodia",
                        "dial_code": "+855",
                        "code": "KH"
                    },
                    {
                        "name": "Cameroon",
                        "dial_code": "+237",
                        "code": "CM"
                    },
                    {
                        "name": "Canada",
                        "dial_code": "+1",
                        "code": "CA"
                    },
                    {
                        "name": "Cape Verde",
                        "dial_code": "+238",
                        "code": "CV"
                    },
                    {
                        "name": "Cayman Islands",
                        "dial_code": "+ 345",
                        "code": "KY"
                    },
                    {
                        "name": "Central African Republic",
                        "dial_code": "+236",
                        "code": "CF"
                    },
                    {
                        "name": "Chad",
                        "dial_code": "+235",
                        "code": "TD"
                    },
                    {
                        "name": "Chile",
                        "dial_code": "+56",
                        "code": "CL"
                    },
                    {
                        "name": "China",
                        "dial_code": "+86",
                        "code": "CN"
                    },
                    {
                        "name": "Christmas Island",
                        "dial_code": "+61",
                        "code": "CX"
                    },
                    {
                        "name": "Cocos (Keeling) Islands",
                        "dial_code": "+61",
                        "code": "CC"
                    },
                    {
                        "name": "Colombia",
                        "dial_code": "+57",
                        "code": "CO"
                    },
                    {
                        "name": "Comoros",
                        "dial_code": "+269",
                        "code": "KM"
                    },
                    {
                        "name": "Congo",
                        "dial_code": "+242",
                        "code": "CG"
                    },
                    {
                        "name": "Congo, The Democratic Republic of the Congo",
                        "dial_code": "+243",
                        "code": "CD"
                    },
                    {
                        "name": "Cook Islands",
                        "dial_code": "+682",
                        "code": "CK"
                    },
                    {
                        "name": "Costa Rica",
                        "dial_code": "+506",
                        "code": "CR"
                    },
                    {
                        "name": "Cote d'Ivoire",
                        "dial_code": "+225",
                        "code": "CI"
                    },
                    {
                        "name": "Croatia",
                        "dial_code": "+385",
                        "code": "HR"
                    },
                    {
                        "name": "Cuba",
                        "dial_code": "+53",
                        "code": "CU"
                    },
                    {
                        "name": "Cyprus",
                        "dial_code": "+357",
                        "code": "CY"
                    },
                    {
                        "name": "Czech Republic",
                        "dial_code": "+420",
                        "code": "CZ"
                    },
                    {
                        "name": "Denmark",
                        "dial_code": "+45",
                        "code": "DK"
                    },
                    {
                        "name": "Djibouti",
                        "dial_code": "+253",
                        "code": "DJ"
                    },
                    {
                        "name": "Dominica",
                        "dial_code": "+1767",
                        "code": "DM"
                    },
                    {
                        "name": "Dominican Republic",
                        "dial_code": "+1849",
                        "code": "DO"
                    },
                    {
                        "name": "Ecuador",
                        "dial_code": "+593",
                        "code": "EC"
                    },
                    {
                        "name": "Egypt",
                        "dial_code": "+20",
                        "code": "EG"
                    },
                    {
                        "name": "El Salvador",
                        "dial_code": "+503",
                        "code": "SV"
                    },
                    {
                        "name": "Equatorial Guinea",
                        "dial_code": "+240",
                        "code": "GQ"
                    },
                    {
                        "name": "Eritrea",
                        "dial_code": "+291",
                        "code": "ER"
                    },
                    {
                        "name": "Estonia",
                        "dial_code": "+372",
                        "code": "EE"
                    },
                    {
                        "name": "Ethiopia",
                        "dial_code": "+251",
                        "code": "ET"
                    },
                    {
                        "name": "Falkland Islands (Malvinas)",
                        "dial_code": "+500",
                        "code": "FK"
                    },
                    {
                        "name": "Faroe Islands",
                        "dial_code": "+298",
                        "code": "FO"
                    },
                    {
                        "name": "Fiji",
                        "dial_code": "+679",
                        "code": "FJ"
                    },
                    {
                        "name": "Finland",
                        "dial_code": "+358",
                        "code": "FI"
                    },
                    {
                        "name": "France",
                        "dial_code": "+33",
                        "code": "FR"
                    },
                    {
                        "name": "French Guiana",
                        "dial_code": "+594",
                        "code": "GF"
                    },
                    {
                        "name": "French Polynesia",
                        "dial_code": "+689",
                        "code": "PF"
                    },
                    {
                        "name": "Gabon",
                        "dial_code": "+241",
                        "code": "GA"
                    },
                    {
                        "name": "Gambia",
                        "dial_code": "+220",
                        "code": "GM"
                    },
                    {
                        "name": "Georgia",
                        "dial_code": "+995",
                        "code": "GE"
                    },
                    {
                        "name": "Germany",
                        "dial_code": "+49",
                        "code": "DE"
                    },
                    {
                        "name": "Ghana",
                        "dial_code": "+233",
                        "code": "GH"
                    },
                    {
                        "name": "Gibraltar",
                        "dial_code": "+350",
                        "code": "GI"
                    },
                    {
                        "name": "Greece",
                        "dial_code": "+30",
                        "code": "GR"
                    },
                    {
                        "name": "Greenland",
                        "dial_code": "+299",
                        "code": "GL"
                    },
                    {
                        "name": "Grenada",
                        "dial_code": "+1473",
                        "code": "GD"
                    },
                    {
                        "name": "Guadeloupe",
                        "dial_code": "+590",
                        "code": "GP"
                    },
                    {
                        "name": "Guam",
                        "dial_code": "+1671",
                        "code": "GU"
                    },
                    {
                        "name": "Guatemala",
                        "dial_code": "+502",
                        "code": "GT"
                    },
                    {
                        "name": "Guernsey",
                        "dial_code": "+44",
                        "code": "GG"
                    },
                    {
                        "name": "Guinea",
                        "dial_code": "+224",
                        "code": "GN"
                    },
                    {
                        "name": "Guinea-Bissau",
                        "dial_code": "+245",
                        "code": "GW"
                    },
                    {
                        "name": "Guyana",
                        "dial_code": "+595",
                        "code": "GY"
                    },
                    {
                        "name": "Haiti",
                        "dial_code": "+509",
                        "code": "HT"
                    },
                    {
                        "name": "Holy See (Vatican City State)",
                        "dial_code": "+379",
                        "code": "VA"
                    },
                    {
                        "name": "Honduras",
                        "dial_code": "+504",
                        "code": "HN"
                    },
                    {
                        "name": "Hong Kong",
                        "dial_code": "+852",
                        "code": "HK"
                    },
                    {
                        "name": "Hungary",
                        "dial_code": "+36",
                        "code": "HU"
                    },
                    {
                        "name": "Iceland",
                        "dial_code": "+354",
                        "code": "IS"
                    },
                    {
                        "name": "India",
                        "dial_code": "+91",
                        "code": "IN"
                    },
                    {
                        "name": "Indonesia",
                        "dial_code": "+62",
                        "code": "ID"
                    },
                    {
                        "name": "Iran, Islamic Republic of Persian Gulf",
                        "dial_code": "+98",
                        "code": "IR"
                    },
                    {
                        "name": "Iraq",
                        "dial_code": "+964",
                        "code": "IQ"
                    },
                    {
                        "name": "Ireland",
                        "dial_code": "+353",
                        "code": "IE"
                    },
                    {
                        "name": "Isle of Man",
                        "dial_code": "+44",
                        "code": "IM"
                    },
                    {
                        "name": "Israel",
                        "dial_code": "+972",
                        "code": "IL"
                    },
                    {
                        "name": "Italy",
                        "dial_code": "+39",
                        "code": "IT"
                    },
                    {
                        "name": "Jamaica",
                        "dial_code": "+1876",
                        "code": "JM"
                    },
                    {
                        "name": "Japan",
                        "dial_code": "+81",
                        "code": "JP"
                    },
                    {
                        "name": "Jersey",
                        "dial_code": "+44",
                        "code": "JE"
                    },
                    {
                        "name": "Jordan",
                        "dial_code": "+962",
                        "code": "JO"
                    },
                    {
                        "name": "Kazakhstan",
                        "dial_code": "+77",
                        "code": "KZ"
                    },
                    {
                        "name": "Kenya",
                        "dial_code": "+254",
                        "code": "KE"
                    },
                    {
                        "name": "Kiribati",
                        "dial_code": "+686",
                        "code": "KI"
                    },
                    {
                        "name": "Korea, Democratic People's Republic of Korea",
                        "dial_code": "+850",
                        "code": "KP"
                    },
                    {
                        "name": "Korea, Republic of South Korea",
                        "dial_code": "+82",
                        "code": "KR"
                    },
                    {
                        "name": "Kuwait",
                        "dial_code": "+965",
                        "code": "KW"
                    },
                    {
                        "name": "Kyrgyzstan",
                        "dial_code": "+996",
                        "code": "KG"
                    },
                    {
                        "name": "Laos",
                        "dial_code": "+856",
                        "code": "LA"
                    },
                    {
                        "name": "Latvia",
                        "dial_code": "+371",
                        "code": "LV"
                    },
                    {
                        "name": "Lebanon",
                        "dial_code": "+961",
                        "code": "LB"
                    },
                    {
                        "name": "Lesotho",
                        "dial_code": "+266",
                        "code": "LS"
                    },
                    {
                        "name": "Liberia",
                        "dial_code": "+231",
                        "code": "LR"
                    },
                    {
                        "name": "Libyan Arab Jamahiriya",
                        "dial_code": "+218",
                        "code": "LY"
                    },
                    {
                        "name": "Liechtenstein",
                        "dial_code": "+423",
                        "code": "LI"
                    },
                    {
                        "name": "Lithuania",
                        "dial_code": "+370",
                        "code": "LT"
                    },
                    {
                        "name": "Luxembourg",
                        "dial_code": "+352",
                        "code": "LU"
                    },
                    {
                        "name": "Macao",
                        "dial_code": "+853",
                        "code": "MO"
                    },
                    {
                        "name": "Macedonia",
                        "dial_code": "+389",
                        "code": "MK"
                    },
                    {
                        "name": "Madagascar",
                        "dial_code": "+261",
                        "code": "MG"
                    },
                    {
                        "name": "Malawi",
                        "dial_code": "+265",
                        "code": "MW"
                    },
                    {
                        "name": "Malaysia",
                        "dial_code": "+60",
                        "code": "MY"
                    },
                    {
                        "name": "Maldives",
                        "dial_code": "+960",
                        "code": "MV"
                    },
                    {
                        "name": "Mali",
                        "dial_code": "+223",
                        "code": "ML"
                    },
                    {
                        "name": "Malta",
                        "dial_code": "+356",
                        "code": "MT"
                    },
                    {
                        "name": "Marshall Islands",
                        "dial_code": "+692",
                        "code": "MH"
                    },
                    {
                        "name": "Martinique",
                        "dial_code": "+596",
                        "code": "MQ"
                    },
                    {
                        "name": "Mauritania",
                        "dial_code": "+222",
                        "code": "MR"
                    },
                    {
                        "name": "Mauritius",
                        "dial_code": "+230",
                        "code": "MU"
                    },
                    {
                        "name": "Mayotte",
                        "dial_code": "+262",
                        "code": "YT"
                    },
                    {
                        "name": "Mexico",
                        "dial_code": "+52",
                        "code": "MX"
                    },
                    {
                        "name": "Micronesia, Federated States of Micronesia",
                        "dial_code": "+691",
                        "code": "FM"
                    },
                    {
                        "name": "Moldova",
                        "dial_code": "+373",
                        "code": "MD"
                    },
                    {
                        "name": "Monaco",
                        "dial_code": "+377",
                        "code": "MC"
                    },
                    {
                        "name": "Mongolia",
                        "dial_code": "+976",
                        "code": "MN"
                    },
                    {
                        "name": "Montenegro",
                        "dial_code": "+382",
                        "code": "ME"
                    },
                    {
                        "name": "Montserrat",
                        "dial_code": "+1664",
                        "code": "MS"
                    },
                    {
                        "name": "Morocco",
                        "dial_code": "+212",
                        "code": "MA"
                    },
                    {
                        "name": "Mozambique",
                        "dial_code": "+258",
                        "code": "MZ"
                    },
                    {
                        "name": "Myanmar",
                        "dial_code": "+95",
                        "code": "MM"
                    },
                    {
                        "name": "Namibia",
                        "dial_code": "+264",
                        "code": "NA"
                    },
                    {
                        "name": "Nauru",
                        "dial_code": "+674",
                        "code": "NR"
                    },
                    {
                        "name": "Nepal",
                        "dial_code": "+977",
                        "code": "NP"
                    },
                    {
                        "name": "Netherlands",
                        "dial_code": "+31",
                        "code": "NL"
                    },
                    {
                        "name": "Netherlands Antilles",
                        "dial_code": "+599",
                        "code": "AN"
                    },
                    {
                        "name": "New Caledonia",
                        "dial_code": "+687",
                        "code": "NC"
                    },
                    {
                        "name": "New Zealand",
                        "dial_code": "+64",
                        "code": "NZ"
                    },
                    {
                        "name": "Nicaragua",
                        "dial_code": "+505",
                        "code": "NI"
                    },
                    {
                        "name": "Niger",
                        "dial_code": "+227",
                        "code": "NE"
                    },
                    {
                        "name": "Nigeria",
                        "dial_code": "+234",
                        "code": "NG"
                    },
                    {
                        "name": "Niue",
                        "dial_code": "+683",
                        "code": "NU"
                    },
                    {
                        "name": "Norfolk Island",
                        "dial_code": "+672",
                        "code": "NF"
                    },
                    {
                        "name": "Northern Mariana Islands",
                        "dial_code": "+1670",
                        "code": "MP"
                    },
                    {
                        "name": "Norway",
                        "dial_code": "+47",
                        "code": "NO"
                    },
                    {
                        "name": "Oman",
                        "dial_code": "+968",
                        "code": "OM"
                    },
                    {
                        "name": "Pakistan",
                        "dial_code": "+92",
                        "code": "PK"
                    },
                    {
                        "name": "Palau",
                        "dial_code": "+680",
                        "code": "PW"
                    },
                    {
                        "name": "Palestinian Territory, Occupied",
                        "dial_code": "+970",
                        "code": "PS"
                    },
                    {
                        "name": "Panama",
                        "dial_code": "+507",
                        "code": "PA"
                    },
                    {
                        "name": "Papua New Guinea",
                        "dial_code": "+675",
                        "code": "PG"
                    },
                    {
                        "name": "Paraguay",
                        "dial_code": "+595",
                        "code": "PY"
                    },
                    {
                        "name": "Peru",
                        "dial_code": "+51",
                        "code": "PE"
                    },
                    {
                        "name": "Philippines",
                        "dial_code": "+63",
                        "code": "PH"
                    },
                    {
                        "name": "Pitcairn",
                        "dial_code": "+872",
                        "code": "PN"
                    },
                    {
                        "name": "Poland",
                        "dial_code": "+48",
                        "code": "PL"
                    },
                    {
                        "name": "Portugal",
                        "dial_code": "+351",
                        "code": "PT"
                    },
                    {
                        "name": "Puerto Rico",
                        "dial_code": "+1939",
                        "code": "PR"
                    },
                    {
                        "name": "Qatar",
                        "dial_code": "+974",
                        "code": "QA"
                    },
                    {
                        "name": "Romania",
                        "dial_code": "+40",
                        "code": "RO"
                    },
                    {
                        "name": "Russia",
                        "dial_code": "+7",
                        "code": "RU"
                    },
                    {
                        "name": "Rwanda",
                        "dial_code": "+250",
                        "code": "RW"
                    },
                    {
                        "name": "Reunion",
                        "dial_code": "+262",
                        "code": "RE"
                    },
                    {
                        "name": "Saint Barthelemy",
                        "dial_code": "+590",
                        "code": "BL"
                    },
                    {
                        "name": "Saint Helena, Ascension and Tristan Da Cunha",
                        "dial_code": "+290",
                        "code": "SH"
                    },
                    {
                        "name": "Saint Kitts and Nevis",
                        "dial_code": "+1869",
                        "code": "KN"
                    },
                    {
                        "name": "Saint Lucia",
                        "dial_code": "+1758",
                        "code": "LC"
                    },
                    {
                        "name": "Saint Martin",
                        "dial_code": "+590",
                        "code": "MF"
                    },
                    {
                        "name": "Saint Pierre and Miquelon",
                        "dial_code": "+508",
                        "code": "PM"
                    },
                    {
                        "name": "Saint Vincent and the Grenadines",
                        "dial_code": "+1784",
                        "code": "VC"
                    },
                    {
                        "name": "Samoa",
                        "dial_code": "+685",
                        "code": "WS"
                    },
                    {
                        "name": "San Marino",
                        "dial_code": "+378",
                        "code": "SM"
                    },
                    {
                        "name": "Sao Tome and Principe",
                        "dial_code": "+239",
                        "code": "ST"
                    },
                    {
                        "name": "Saudi Arabia",
                        "dial_code": "+966",
                        "code": "SA"
                    },
                    {
                        "name": "Senegal",
                        "dial_code": "+221",
                        "code": "SN"
                    },
                    {
                        "name": "Serbia",
                        "dial_code": "+381",
                        "code": "RS"
                    },
                    {
                        "name": "Seychelles",
                        "dial_code": "+248",
                        "code": "SC"
                    },
                    {
                        "name": "Sierra Leone",
                        "dial_code": "+232",
                        "code": "SL"
                    },
                    {
                        "name": "Singapore",
                        "dial_code": "+65",
                        "code": "SG"
                    },
                    {
                        "name": "Slovakia",
                        "dial_code": "+421",
                        "code": "SK"
                    },
                    {
                        "name": "Slovenia",
                        "dial_code": "+386",
                        "code": "SI"
                    },
                    {
                        "name": "Solomon Islands",
                        "dial_code": "+677",
                        "code": "SB"
                    },
                    {
                        "name": "Somalia",
                        "dial_code": "+252",
                        "code": "SO"
                    },
                    {
                        "name": "South Africa",
                        "dial_code": "+27",
                        "code": "ZA"
                    },
                    {
                        "name": "South Sudan",
                        "dial_code": "+211",
                        "code": "SS"
                    },
                    {
                        "name": "South Georgia and the South Sandwich Islands",
                        "dial_code": "+500",
                        "code": "GS"
                    },
                    {
                        "name": "Spain",
                        "dial_code": "+34",
                        "code": "ES"
                    },
                    {
                        "name": "Sri Lanka",
                        "dial_code": "+94",
                        "code": "LK"
                    },
                    {
                        "name": "Sudan",
                        "dial_code": "+249",
                        "code": "SD"
                    },
                    {
                        "name": "Suriname",
                        "dial_code": "+597",
                        "code": "SR"
                    },
                    {
                        "name": "Svalbard and Jan Mayen",
                        "dial_code": "+47",
                        "code": "SJ"
                    },
                    {
                        "name": "Swaziland",
                        "dial_code": "+268",
                        "code": "SZ"
                    },
                    {
                        "name": "Sweden",
                        "dial_code": "+46",
                        "code": "SE"
                    },
                    {
                        "name": "Switzerland",
                        "dial_code": "+41",
                        "code": "CH"
                    },
                    {
                        "name": "Syrian Arab Republic",
                        "dial_code": "+963",
                        "code": "SY"
                    },
                    {
                        "name": "Taiwan",
                        "dial_code": "+886",
                        "code": "TW"
                    },
                    {
                        "name": "Tajikistan",
                        "dial_code": "+992",
                        "code": "TJ"
                    },
                    {
                        "name": "Tanzania, United Republic of Tanzania",
                        "dial_code": "+255",
                        "code": "TZ"
                    },
                    {
                        "name": "Thailand",
                        "dial_code": "+66",
                        "code": "TH"
                    },
                    {
                        "name": "Timor-Leste",
                        "dial_code": "+670",
                        "code": "TL"
                    },
                    {
                        "name": "Togo",
                        "dial_code": "+228",
                        "code": "TG"
                    },
                    {
                        "name": "Tokelau",
                        "dial_code": "+690",
                        "code": "TK"
                    },
                    {
                        "name": "Tonga",
                        "dial_code": "+676",
                        "code": "TO"
                    },
                    {
                        "name": "Trinidad and Tobago",
                        "dial_code": "+1868",
                        "code": "TT"
                    },
                    {
                        "name": "Tunisia",
                        "dial_code": "+216",
                        "code": "TN"
                    },
                    {
                        "name": "Turkey",
                        "dial_code": "+90",
                        "code": "TR"
                    },
                    {
                        "name": "Turkmenistan",
                        "dial_code": "+993",
                        "code": "TM"
                    },
                    {
                        "name": "Turks and Caicos Islands",
                        "dial_code": "+1649",
                        "code": "TC"
                    },
                    {
                        "name": "Tuvalu",
                        "dial_code": "+688",
                        "code": "TV"
                    },
                    {
                        "name": "Uganda",
                        "dial_code": "+256",
                        "code": "UG"
                    },
                    {
                        "name": "Ukraine",
                        "dial_code": "+380",
                        "code": "UA"
                    },
                    {
                        "name": "United Arab Emirates",
                        "dial_code": "+971",
                        "code": "AE"
                    },
                    {
                        "name": "United Kingdom",
                        "dial_code": "+44",
                        "code": "GB"
                    },
                    {
                        "name": "United States",
                        "dial_code": "+1",
                        "code": "US"
                    },
                    {
                        "name": "Uruguay",
                        "dial_code": "+598",
                        "code": "UY"
                    },
                    {
                        "name": "Uzbekistan",
                        "dial_code": "+998",
                        "code": "UZ"
                    },
                    {
                        "name": "Vanuatu",
                        "dial_code": "+678",
                        "code": "VU"
                    },
                    {
                        "name": "Venezuela, Bolivarian Republic of Venezuela",
                        "dial_code": "+58",
                        "code": "VE"
                    },
                    {
                        "name": "Vietnam",
                        "dial_code": "+84",
                        "code": "VN"
                    },
                    {
                        "name": "Virgin Islands, British",
                        "dial_code": "+1284",
                        "code": "VG"
                    },
                    {
                        "name": "Virgin Islands, U.S.",
                        "dial_code": "+1340",
                        "code": "VI"
                    },
                    {
                        "name": "Wallis and Futuna",
                        "dial_code": "+681",
                        "code": "WF"
                    },
                    {
                        "name": "Yemen",
                        "dial_code": "+967",
                        "code": "YE"
                    },
                    {
                        "name": "Zambia",
                        "dial_code": "+260",
                        "code": "ZM"
                    },
                    {
                        "name": "Zimbabwe",
                        "dial_code": "+263",
                        "code": "ZW"
                    }
                ],
                teams: [],
                events: [],
                specialEvent: null
            };
        },
        methods: {
            ...mapActions(["getReq", "postReq", "putReq", "accessControl","uploadAndReturnFile"]),
            async exportCsv() {
                let res = await this.postReq({
                    url: '/api/json-and-csv/json-to-csv'
                });
                console.log(res);
                if(res.success) {
                    const link = document.createElement('a');
                    link.download = `${this.form.display_name}.csv`;
                    link.href = res.path;
                    link.click();
                }
            },
            chooseCsv(e) {
                const input = e.target;
                if(input.files.length) {
                    const file = input.files[0];
                    this.csvFile = {
                        file: file,
                        value: input.value
                    }
                }
            },
            removeCsv() {
                this.csvFile = null;
                this.$refs['file-input'].reset()
            },
            async uploadCsv() {
                try {
                    if(this.csvFile) {
                        const formData = new FormData();
                        formData.append('file', this.csvFile);
                        const res = await this.uploadAndReturnFile({
                            url: '/api/json-and-csv/csv-to-json',
                            body: formData
                        });
                        if (res.success) {
                            this.$router.go(this.$router.currentRoute);
                            return (this.success_msg = res.success == true ? "User Updated." : "Couldn't Update User");
                        } else {
                            alert('Internal Server Error')
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            async fileChange(e, name) {
                const input = e.target;
                if(input.files[0].size > 204800) {
                    input.value = "";
                    alert("File is too big!");
                } else {
                    const formData = new FormData();
                    const file = input.files[0];
                    formData.append('file', file);
                    let res = await this.uploadAndReturnFile({
                        url: '/uploadfile',
                        body: formData
                    });
                    if(res.success) {
                        const userFile = res.file.path.replace('static','');
                        switch (name) {
                            case 'age':
                                this.form.formulaBharatDetails.age.file = userFile;
                                break;
                            case 'medicalInsurance':
                                this.form.formulaBharatDetails.medicalInsurance.file = userFile;
                                break;
                            case 'ifDesignatedDriver':
                                this.form.formulaBharatDetails.ifDesignatedDriver.file = userFile;
                                break;
                        }
                    } else {
                        alert(res.message)
                    }
                }
            },
            async changePhoneNumber() {
                setTimeout(() => {
                    this.form.phone_number = `(${this.form.phone_parts.code})${this.form.phone_parts.number}`;
                },200)
            },
            async changeContactNumber() {
                setTimeout(() => {
                    this.form.formulaBharatDetails.emergencyContactDetails.contactPhoneNumber = `(${this.form.formulaBharatDetails.emergencyContactDetails.phone_parts.code})${this.form.formulaBharatDetails.emergencyContactDetails.phone_parts.number}`;
                    console.log(this.form.formulaBharatDetails)
                },200)

            },
            removeFIle(obj) {
                obj.file = '';
            },
            validateFields(object, keys) {
                for (const key of keys) {
                    if(typeof  object[key] !== "object" || object[key] === null) {
                        if(typeof object[key] === 'undefined' || object[key] === null || object[key] === '') {
                            console.log(key, object[key]);
                            this.valid =false;
                            break;
                        }
                    } else {
                        if (object[key] !== null) {
                            this.validateFields(object[key], Object.keys(object[key]));
                        }
                    }
                }
            },
            submitParticipantInfo() {
                this.user.infoSubmited = true;
                this.onSubmit();
            },
            async onSubmit() {
                this.valid = true;

                this.validateFields(this.form, this.validate);


                if(!this.valid) {
                    return
                }
                if(this.form.eventOfParticipation && this.form.eventOfParticipation == this.specialEvent && this.form.formulaBharatDetails) {
                    for (const key in this.form.formulaBharatDetails) {
                        if(typeof  this.form.formulaBharatDetails[key] !== "object" || this.form.formulaBharatDetails[key] === null) {
                            if(typeof this.form.formulaBharatDetails[key] === 'undefined' || this.form.formulaBharatDetails[key] === null || this.form.formulaBharatDetails[key] === '') {
                                console.log('isvla', key)
                                this.valid = false;
                                break;
                            }
                        } else {
                            for (const key2 in this.form.formulaBharatDetails[key]) {
                                if(typeof this.form.formulaBharatDetails[key][key2] === 'undefined' ||  this.form.formulaBharatDetails[key][key2] === null || this.form.formulaBharatDetails[key][key2] === '') {
                                    console.log('isvla', `${key}-${key2}`)
                                    if( (key2 === 'file') &&  ( (key !== 'age' && key !== 'ifDesignatedDriver') || (key === 'age' && parseInt(this.form.formulaBharatDetails[key].value) < 18) || ( key === 'ifDesignatedDriver' && this.form.formulaBharatDetails[key].answer  ) ) )  {
                                        this.valid = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                if(!this.valid || document.querySelector('.is-invalid')) {
                    return
                }

                (this.success_msg = null) , (this.errors = []);


                let url = `/api/user/update`;
                try {
                    const dataToSend = {
                        phone_number: this.form.phone_number,
                        profile: {
                            picture: this.form.link_to_logo
                        },
                        bio: this.form.bio,
                        display_name: this.form.display_name,
                        // userType: this.form.userType,
                        // roleOnTeam: this.form.roleOnTeam,
                        // yearOfStudy: this.form.yearOfStudy,
                        // programOFStudy: this.form.programOFStudy,
                        eventOfParticipation: this.form.eventOfParticipation,
                        formulaBharatDetails: this.form.formulaBharatDetails,
                        phone_parts:   this.form.phone_parts,
                        volunteerFields: this.form.volunteerFields,
                        infoSubmited: this.user.infoSubmited
                    };




                    if(this.isAdmin) {
                        dataToSend.email = this.form.email;
                    }
                    console.log('dataToSend',dataToSend)
                    let res = await this.putReq({
                        url: url,
                        body: dataToSend
                    });

                    if (res.success) {
                        this.$router.go(this.$router.currentRoute)
                        return (this.success_msg = res.success == true ? "User created." : "Couldn't Create User");
                    }
                    return this.errors.push(res.message);
                } catch (error) {
                    console.log('error',error)
                    return this.errors.push(error);
                }
            },
            async onReset() {
                await this.loadFormData();
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
            generatePDF() {

                let html =
                    `<div class="pdf-wrapper">
              <h3>${this.form.display_name}</h3>
              <table border="1">
                <tbody>
                <tr>
                  <td>Display Name</td>
                  <td>${this.form.display_name}</td>
                </tr>
                <tr>
                  <td>Phone number</td>
                  <td>${this.form.phone_number}</td>
                </tr>`;
                html += this.generatePdfPart(this.form.volunteerFields.currentPosition,'Current Position at Work / Study');
                html += this.generatePdfPart(this.form.volunteerFields.currentWorkplace,'Current Workplace / Institution');
                html += this.generatePdfPart(this.form.volunteerFields.highestLvl,'Highest level of study attained');
                html += this.generatePdfPart(this.form.volunteerFields.postalAddress,'Postal Mailing Address');
                html += this.generatePdfPart(this.form.email,'Email');
                html += this.generatePdfPart(this.form.bio,'Bio');
                const event = this.events.find(item => item._id === this.form.eventOfParticipation);
                if (event) {
                    html += this.generatePdfPart(event.name,'Event of Participation', event);
                }
                if(this.form.eventOfParticipation && this.form.eventOfParticipation == this.specialEvent && this.form.formulaBharatDetails) {
                    html += this.generatePdfHead('Formula Bharat 2020 Details','h5');
                    html += this.generatePdfPart(this.form.formulaBharatDetails.fullName,'Full Name');
                    if(this.form.formulaBharatDetails.age) {
                        html += this.generatePdfPart(this.form.formulaBharatDetails.age.value,'Age');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.age.file,'Signed Under 18 Waiver', parseInt(this.form.formulaBharatDetails.age.value) < 18 && this.form.formulaBharatDetails.age.file, true);
                    }
                    html += this.generatePdfPart(this.form.formulaBharatDetails.gender,'Gender');
                    html += this.generatePdfPart(this.form.formulaBharatDetails.dietaryInformation,'Dietary Information');
                    if(this.form.formulaBharatDetails.emergencyContactDetails) {
                        html += this.generatePdfHead('Emergency Contact Details');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.emergencyContactDetails.contactName,'Contact Name');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.emergencyContactDetails.contactPhoneNumber,'Phone Number');
                    }
                    if(this.form.formulaBharatDetails.medicalInsurance) {
                        html += this.generatePdfHead('Medical / Travel Insurance Details');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.medicalInsurance.name,'Provider Name');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.medicalInsurance.number,'Coverage Number');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.medicalInsurance.file,'Insurance Coverage proof',true,true);
                    }
                    if(this.form.formulaBharatDetails.ifDesignatedDriver) {
                        html += this.generatePdfHead('Driver Details');
                        html += this.generatePdfPart(`${(this.form.formulaBharatDetails.ifDesignatedDriver.answer)?'Yes':'No'}`,'If Driver');
                        html += this.generatePdfPart(this.form.formulaBharatDetails.ifDesignatedDriver.file,'Insurance Coverage proof',this.form.formulaBharatDetails.ifDesignatedDriver.answer && this.form.formulaBharatDetails.ifDesignatedDriver.file,true);
                    }
                    html += this.generatePdfPart(`${(this.form.formulaBharatDetails.individualAgree === 'Yes')?'Yes':'No'}`,'I accept the T&C ');
                }
                html += `
                </tbody>
              </table>
           </div>`;

                const element = document.createElement('div');
                element.innerHTML = html;
                const options = {
                    filename:     this.form.display_name,
                    image:        { type: 'jpeg', quality: 1 },
                    pagebreak:  { mode: '', before: '.before', after: '.after', avoid: '.avoid' },
                };

                window.html2pdf().from(element).set(options).save()
            },
            generateCertificate(type) {

                let html =
                    `<div class="pdf-wrapper">
                     <h3>${this.form.display_name} Certificate</h3>
                <table border="1">
                  <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>${this.form.display_name}</td>
                  </tr>
                `;
                html += this.generatePdfPart(this.form.volunteerFields.currentPosition,'Volunteer Role at event', this.form.volunteerFields && this.form.volunteerFields.currentPosition);
                html += `
                  </tbody>
                </table>
             </div>`;

                const element = document.createElement('div');
                element.innerHTML = html;

                switch (type) {
                    case 'PDF':
                        const options = {
                            filename:     this.form.display_name,
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
                                link.download = `${this.form.display_name}.png`;
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
                            link.download = `${this.form.display_name}.jpeg`;
                            link.href = dataUrl;
                            link.click();
                        });
                        break;
                }
            },
            highlight(text) {
               var inputText = document.getElementById("inputText");
               var innerHTML = inputText.innerHTML;
               var index = innerHTML.indexOf(text);
               if (index >= 0) {
                   innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
                   inputText.innerHTML = innerHTML;
               }
           },
            async loadFormData() {
                try {
                    let res = await this.getReq({
                        url: '/api/user/profile/' + this.currentUser.username
                    })
                    if (res.success) {
                        this.user = res.user;
                        if(this.user.role.includes('participant')) {
                            this.$router.push({name:'profile-update'});
                        }
                        console.log('this.user', this.user);
                        this.isAdmin = this.user.role.includes('admin');
                        this.form.bio = this.user.bio;
                        this.form.phone_number = this.user.phone_number;
                        this.form.display_name = this.user.display_name;
                        this.form.link_to_logo = this.user.profile.picture;

                        // new fields
                        this.form.email = this.user.email;

                        this.form.userType = this.user.userType;
                        this.form.roleOnTeam = this.user.roleOnTeam;
                        this.form.yearOfStudy = this.user.yearOfStudy;
                        this.form.programOFStudy = this.user.programOFStudy;

                        this.form.eventOfParticipation = this.user.eventOfParticipation;
                        if (this.user.phone_parts) {
                            this.form.phone_parts = this.user.phone_parts
                        }


                        if(this.user.eventOfParticipation && this.user.formulaBharatDetails) {
                            this.form.formulaBharatDetails = this.user.formulaBharatDetails;
                            if (!this.form.formulaBharatDetails.emergencyContactDetails.phone_parts) {
                                this.form.formulaBharatDetails.emergencyContactDetails.phone_parts = {
                                    code: "",
                                    number: "",
                                }
                            }
                        }

                        if(this.user.volunteerFields) {
                            this.form.volunteerFields = this.user.volunteerFields;
                            if(this.form.volunteerFields.claimAlmusStatus){
                                this.form.volunteerFields.claimAlmusStatus = this.form.volunteerFields.claimAlmusStatus._id;
                            }
                        }
                        console.log('init form', this.form)
                    }
                } catch (error) {
                    console.log(error)
                    this.form.bio = this.currentUser.bio;
                    this.form.phone_number = this.currentUser.phone_number;
                    this.form.display_name = this.currentUser.display_name;
                    this.form.link_to_logo = this.currentUser.profile.picture;
                }
            },
            async loadTeams() {
                try {
                    let res = await this.getReq({
                        url: '/api/team'
                    });
                    if (res.success && res.teams) {
                      this.teams = res.teams;
                      console.log(this.teams)
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            async loadEvents() {
                try {
                    let res = await this.getReq({
                        url: '/api/event/current'
                    });
                    if (res.success && res.events) {
                        this.events = res.events;
                        console.log(this.events)
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            async loadSpecialEvent() {
                try {
                    let res = await this.getReq({
                        url: '/api/event/special'
                    });
                    if (res.success && res.event) {
                        this.specialEvent = res.event._id;
                        console.log('this.specialEvent',this.specialEvent)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        },
        computed: {
            ...mapGetters(["currentUser"])
        },
        mounted() {
            this.$nextTick(function () {
                this.loadFormData();
                this.loadTeams();
                this.loadEvents();
                this.loadSpecialEvent();
                this.location = window.location.origin;
            });
        }
    };
</script>
