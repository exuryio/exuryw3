<template>
  <v-container class="licenses-wrapper" max-width="lg">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-6 policy-card" outlined elevation="2">
          <v-card-title class="headline">
            <v-icon color="primary" left>mdi-certificate</v-icon>
            Licencias
          </v-card-title>
          <v-card-subtitle class="body-1">
             <strong>España</strong>
          </v-card-subtitle>
          <v-card-text class="body-2" color="text.primary">
            Exury, marca registrada de <strong>Divisy App S.L</strong>, ha obtenido el registro como <strong>Proveedor de Servicios de Cambio de Moneda Virtual por Moneda Fiduciaria</strong> por parte del Banco de España (número de registro <strong>E102</strong>).
            Este registro habilita a <strong>Divisy App S.L.</strong> para proporcionar servicios de intercambio de criptoactivos, garantizando la regulación y seguridad de las operaciones realizadas en nuestra plataforma.
          </v-card-text>
          <v-card-text class="body-2" color="text.primary">
            En Exury nos comprometemos a ofrecer un servicio transparente, confiable y seguro, cumpliendo con las normativas y regulaciones de las autoridades competentes.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Licenses",
};
</script>

<style scoped>


.policy-card {
  border-radius: 28px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #0d1513;
  border: 1px solid #2d4740;
  opacity: 0.7;
}

.v-card-title {
  font-size: 1.5rem;
  color: #1cba75; /* Color oscuro para el título */
  font-weight: 600;
}

.v-card-subtitle {
  margin-top: 16px;
  font-size: 1.125rem;
  color: #c7d4cf; /* Color gris para subtítulo */
}

.v-card-text {
  font-size: 1rem;
  margin-top: 12px;
  color: ##E6E1E3;
}

body {
  font-family: 'Roboto', sans-serif;
}

strong {
  font-weight: 600;
}

.v-icon {
  font-size: 1.5rem;
}
</style>
