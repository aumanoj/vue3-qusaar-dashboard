<template>
    
      <div class="row q-col-gutter-sm">
        <div class="col-4">
           <q-card class="bg-info">
          <q-card-section horizontal>
          <q-card-section align="left">
              <div class="text-white text-h6">700</div>
              <div class="text-white text-subtitle2 q-mt-lg">Earned Points</div>
            </q-card-section>
            <q-card-section align="right">
              <div class="text-white text-subtitle2 q-mt-lg q-mb-md">
                <q-icon name="fas fa-dollar-sign" color="white" size="44px" ></q-icon>
            </div>
          </q-card-section>
          </q-card-section>
          <q-card-section class="pd-0">
            <q-btn unelevated label="More Info" icon-right="fas fa-arrow-circle-right" class="full-width text-capitalize text-weight-bold" color="blue-grey-7"/>
          </q-card-section>
        </q-card>
        </div>
        <div class="col-4">
           <q-card class="bg-light-blue-13">
          <q-card-section horizontal>
          <q-card-section>
              <div class="text-white text-h6">0</div>
              <div class="text-white text-subtitle2 q-mt-lg">Points Redeemed


</div>
            </q-card-section>
            <q-card-section>
              <div class="text-white text-subtitle2 q-mt-lg q-mb-md">
                <q-icon name="fas fa-dollar-sign" color="white" size="44px"></q-icon>
            </div>
          </q-card-section>
          </q-card-section>
          <q-card-section class="pd-0">
            <q-btn unelevated label="More Info" icon-right="fas fa-arrow-circle-right" class="full-width text-capitalize text-weight-bold" color="blue-grey-7"/>
          </q-card-section>
        </q-card>
        </div>
        <div class="col-4">
           <q-card class="bg-teal-6">
          <q-card-section horizontal>
          <q-card-section>
              <div class="text-white text-h6">100</div>
              <div class="text-white text-subtitle2 q-mt-lg">Points Available
</div>
            </q-card-section>
            <q-card-section>
              <div class="text-white text-subtitle2 q-mt-lg q-mb-md">
                <q-icon name="fas fa-dollar-sign" color="white" size="44px"></q-icon>
            </div>
          </q-card-section>
          </q-card-section>
          <q-card-section class="pd-0">
            <q-btn unelevated label="More Info" icon-right="fas fa-arrow-circle-right" class="full-width text-capitalize text-weight-bold" color="blue-grey-7"/>
          </q-card-section>
        </q-card>
        </div>
      </div>
</template>

<script>
export default {
  name: "CardMypoint",
  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },
};
</script>
<style></style>

