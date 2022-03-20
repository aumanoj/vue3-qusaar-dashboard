<template>
  <q-card class="survey-card">
    <q-card-section class="q-pa-none">
      <div class="text-h4 text-weight-bolder text-center">
        <img src="https://panel.alrestion.com/assets/backend/dist/img/completed-task.png" class="q-mt-md">
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center text-dark">
        Education
      </div>
      <div class="separator"></div>
    </q-card-section>
    <q-card-actions vertical align="center" class="q-pb-md text-dark card-top-text">
       <q-btn color="red" icon="" icon-right="" label="Answers ( 2 )" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "SurveyCard"
}
</script>

<style>
</style>
