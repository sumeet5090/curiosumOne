<template>
    <b-container>
        <b-row class="justify-content-center py-5">
            <b-col sm="12" class="text-center">
              <i class="fas fa-exclamation-triangle text-warning fa-3x"></i>
            </b-col>
            <b-col sm="12" class="text-center h3  text-uppercase font-weight-bold text-warning">
              Error
            </b-col>
            <b-col sm="12" class="text-center text-dark">
              {{message}}
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: "error-page",
  props: {
    message: {
      type: String,
      description: "Error message"
    }
  }
};
</script>