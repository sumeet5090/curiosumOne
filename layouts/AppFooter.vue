<template>
<div class="container">
  <div class="row row-grid align-items-center pt-4 mx-3">
    <div class="col-md-6">
      <div class="text-primary font-weight-light mb-2 h5"><a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=business@mobilityeng.in&su=Feedback%20Mobility Eng Portal&tf=1" target="_blank" rel="noreferrer" class="hover-me-i-shake">Leave us some feedback!</a></div>
      <div class="text-dark font-weight-light text-black-50">We would love to hear from you!</div>
    </div>
    <div class="col-md-6">
      <div class="d-flex flex-column align-items-sm-center align-items-md-end">
        <div class="mb-0 font-weight-light h6">Contact the developer.</div>
        <div class>
          <a v-b-tooltip.hover title="Github" class="footer-icons" href="https://github.com/frozen4code" target="_blank" rel="noreferrer" ><i class="fab fa-github-square fa-2x" style="color: #24292E;" aria-label="Github" ></i></a>
          <a v-b-tooltip.hover title="LinkedIn" class="footer-icons" href="https://www.linkedin.com/in/bhupinder-singh-maan-32aaa8159/" target="_blank" rel="noreferrer" ><i class="fab fa-linkedin fa-2x" style="color: #0077B5;" aria-label="LinkedIn" ></i></a>
          <a v-b-tooltip.hover title="Gmail" class="footer-icons" href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpndrsingh306@gmail.com&su=Feedback%20Mobility Eng Portal&tf=1" target="_blank" rel="noreferrer" aria-label="Gmail" ><i class="fas fa-envelope-square fa-2x text-danger"></i></a>
          <a v-b-tooltip.hover title="Facebook" class="footer-icons" href="https://www.fb.com/bsm990" target="_blank" rel="noreferrer" ><i class="fab fa-facebook-square fa-2x" style="color: #3B5999" aria-label="Facebook"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.footer {
  padding-bottom: 1.5rem !important;
}
.footer-icons {
  margin-left: 0.2rem;
}
</style>
