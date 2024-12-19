<template>
    <div class="privacy-policy mdc-typography">
      <div class="container">
        <header class="policy-header mdc-typography--headline4">
          <h1>Política de Privacidad</h1>
          <p class="policy-date">Última actualización: 17 de diciembre de 2024</p>
        </header>
  
        <section class="policy-content">
            
        <!-- Aspectos Generales -->
        <div class="policy-section" id="general-aspects">
            <div class="mdc-card section-card">
            <h2 @click="toggle('general-aspects')" class="expandable-title mdc-typography--headline5">
                1. Aspectos Generales <span :class="{'expanded': expandedSection === 'general-aspects'}">▼</span>
            </h2>
            <div v-if="expandedSection === 'general-aspects'" class="mdc-typography--body1 justified-text">
                <p>
                Esta Política de Privacidad se aplica tanto al sitio web alojado bajo el nombre de dominio exury.io (en adelante, el “Sitio Web”), como a la aplicación móvil (en adelante, la “App”), ambos gestionados por DIVISY APP, S.L., sociedad mercantil con domicilio social en Calle Hermosilla 48, 1ra Derecha, 28001 Madrid, España, con CIF: B-56826183, inscrita en el Registro Mercantil de Madrid, Tomo 9.334, Folio 18, Inscripción 1, Hoja V-143.975 y cuya marca comercial registrada es Exury (en adelante, “Exury”). 
                Esta política también abarca los subdominios y páginas web dependientes de dicho dominio.
                </p>
                <p>
                De conformidad con el Reglamento General de Protección de Datos (RGPD) y demás normativa europea y nacional aplicable en materia de protección de datos, Exury informa a los usuarios (en adelante, el/los “Usuario/s”) del Sitio Web y la App sobre los términos aplicables al tratamiento de sus datos personales. Esto incluye los datos facilitados a través de formularios habilitados para acceder a los servicios ofrecidos en la plataforma, así como cualquier interacción que el Usuario realice con Exury.
                </p>
                <h3 class="mdc-typography--subtitle1">Recogida y Uso de Datos Personales</h3>
                <ul>
                <li><strong>Navegación sin registro:</strong> Los Usuarios pueden navegar por el Sitio Web y la App sin necesidad de proporcionar datos personales.</li>
                <li><strong>Servicios específicos:</strong> En ciertos casos, para acceder a servicios relacionados con la compraventa de criptomonedas u otras funcionalidades, será necesario proporcionar datos personales como parte del proceso.</li>
                <li><strong>Aceptación expresa:</strong> El envío de datos personales en el marco de transacciones o interacciones con Exury implica necesariamente la aceptación expresa, libre e inequívoca de la presente Política de Privacidad, así como de los Términos y Condiciones de Uso. Durante el proceso de registro, compra o venta, el Usuario deberá confirmar dicha aceptación marcando una casilla habilitada específicamente para este propósito.</li>
                </ul>
                <h3 class="mdc-typography--subtitle1">Recomendación para el Usuario</h3>
                <p>
                Se recomienda que los Usuarios lean detenidamente tanto esta Política de Privacidad como los Términos y Condiciones de Uso antes de proceder al uso del Sitio Web, la App o cualquier servicio relacionado.
                </p>
                <p>
                Exury se compromete a tratar los datos personales con la máxima diligencia y a cumplir estrictamente con las disposiciones legales vigentes en materia de protección de datos.
                </p>
            </div>
            </div>
        </div>

            <!-- Tratamiento de los Datos de Carácter Personal -->
            <div class="policy-section" id="personal-data-processing">
                <div class="mdc-card section-card">
                    <h2 @click="toggle('personal-data-processing')" class="expandable-title mdc-typography--headline5">
                        2. Tratamiento de los Datos de Carácter Personal <span :class="{'expanded': expandedSection === 'personal-data-processing'}">▼</span>
                    </h2>
                    <div v-if="expandedSection === 'personal-data-processing'" class="mdc-typography--body1 justified-text">
                        <h3 class="mdc-typography--subtitle1">2.1 Recopilación y Tratamiento de Datos Personales</h3>
                        <p>
                            En Exury, tratamos los datos personales de los usuarios de manera transparente, segura y con pleno cumplimiento del Reglamento General de Protección de Datos (RGPD). Cuando un usuario interactúa con nuestros servicios para comprar, vender o intercambiar criptomonedas, recopilamos los datos necesarios para gestionar adecuadamente dichas solicitudes y garantizar la prestación del servicio.
                        </p>
                        <p>
                            El usuario queda informado y otorga su consentimiento inequívoco para la incorporación de sus datos a los siguientes ficheros gestionados por Exury:
                        </p>
                        <ul>
                            <li><strong>Usuarios de Servicios Interactivos:</strong>
                                <ul>
                                    <li><strong>Finalidad:</strong> Gestión de los usuarios que solicitan servicios a través de nuestra web o app.</li>
                                    <li><strong>Tratamiento:</strong> Automatizado y no automatizado.</li>
                                </ul>
                            </li>
                            <li><strong>Facturación de Servicios:</strong>
                                <ul>
                                    <li><strong>Finalidad:</strong> Gestionar los datos necesarios para la facturación de los servicios prestados.</li>
                                    <li><strong>Tratamiento:</strong> Automatizado y no automatizado.</li>
                                </ul>
                            </li>
                        </ul>
                        <h3 class="mdc-typography--subtitle1">Formularios de Recopilación de Datos</h3>
                        <p>Los usuarios deberán completar formularios específicos en función del servicio solicitado, proporcionando datos exactos y veraces:</p>
                        <ul>
                            <li><strong>Formulario de Compra de Criptomonedas (FIAT a Criptomoneda):</strong>
                                <ul>
                                    <li><strong>Datos requeridos:</strong> Nombre, dirección fiscal, fotografía del documento de identidad, selfie, número de teléfono, correo electrónico, prueba de residencia, origen de fondos, monedero virtual y datos bancarios o de tarjeta.</li>
                                    <li>Si el usuario actúa en representación de una entidad, se requerirán documentos acreditativos de esta.</li>
                                </ul>
                            </li>
                            <li><strong>Formulario de Venta de Criptomonedas (Criptomoneda a FIAT):</strong>
                                <ul>
                                    <li><strong>Datos requeridos:</strong> Nombre, fotografía del documento de identidad, selfie, correo electrónico, número de teléfono y número de cuenta bancaria (IBAN).</li>
                                </ul>
                            </li>
                            <li><strong>Formulario de Intercambio de Criptomonedas (Criptomoneda a Criptomoneda):</strong>
                                <ul>
                                    <li><strong>Datos requeridos:</strong> Nombre, fotografía del documento de identidad, selfie, correo electrónico, número de teléfono y monedero virtual.</li>
                                </ul>
                            </li>
                        </ul>
                        <h3 class="mdc-typography--subtitle1">Confidencialidad y Compartición de Datos</h3>
                        <p>
                            Todos los datos proporcionados son tratados con estricta confidencialidad. Sólo se compartirán con terceros cuando sea estrictamente necesario para la prestación del servicio, y siempre se informará previamente al usuario y se solicitará su consentimiento.
                        </p>
                        <p>
                            En este sentido, el proceso de verificación de identidad ha sido externalizado a Sum and Substance Ltd (UK), entidad especializada que valida los datos aportados por los usuarios.
                        </p>
                        <ul>
                            <li><strong>Datos compartidos:</strong> Identificación, fotografías y documentos acreditativos.</li>
                            <li><strong>Finalidad:</strong> Validación y verificación de identidad.</li>
                        </ul>
                        <p>
                            <strong>Información adicional sobre Sum and Substance Ltd:</strong>
                            <br>Registro de Protección de Datos: ZA222205.
                            <br>Registro Mercantil: 09688671.
                            <br>Dirección: 30 St. Mary Axe, London, England, EC3A 8BF.
                            <br>Más detalles en: <a href="https://sumsub.com/" target="_blank">https://sumsub.com/</a> y <a href="https://sumsub.com/data-protection-policy/" target="_blank">https://sumsub.com/data-protection-policy/</a>.
                        </p>
                        <h3 class="mdc-typography--subtitle1">Datos Adicionales Recopilados</h3>
                        <p>
                            Durante el uso de nuestra web o app, Exury también recopila información técnica como:
                        </p>
                        <ul>
                            <li>Dirección IP.</li>
                            <li>Tipo de navegador.</li>
                            <li>Tipo de dispositivo.</li>
                            <li>Horarios de acceso.</li>
                            <li>Páginas visitadas.</li>
                        </ul>
                        <p>
                            Durante los procesos descritos podrán ser solicitados datos adicionales de tipo económico o financiero (como, por ejemplo, el número de su tarjeta de crédito o débito o cuenta bancaria) al objeto de llevar a cabo la ejecución de los servicios.
                        </p>
                        <h3 class="mdc-typography--subtitle1">Responsabilidad del Usuario</h3>
                        <p>
                            El usuario es responsable de la veracidad y exactitud de los datos proporcionados. Exury se reserva el derecho de excluir del servicio a cualquier usuario que facilite información falsa o desactualizada. Además, el usuario debe notificar cualquier cambio en sus datos.
                        </p>
                        <h3 class="mdc-typography--subtitle1">Protección y Seguridad de los Datos</h3>
                        <p>
                            Exury implementa medidas técnicas y organizativas avanzadas para proteger los datos personales, conforme al artículo 32 del RGPD, incluyendo:
                        </p>
                        <ul>
                            <li>Encriptación: Protección de datos sensibles en tránsito y almacenamiento.</li>
                            <li>Control de accesos: Restricción a personal autorizado.</li>
                            <li>Auditorías regulares: Revisión de procesos de seguridad.</li>
                        </ul>
                        <h3 class="mdc-typography--subtitle1">Base Legal del Tratamiento</h3>
                        <p>
                            El tratamiento de datos personales se realiza sobre la base del consentimiento explícito del usuario, otorgado mediante los mecanismos habilitados. Esto garantiza la transparencia y el cumplimiento normativo en todas las operaciones realizadas por Exury.
                        </p>
                        <h3>2.2. Finalidades del Tratamiento</h3>
                        <p>
                        Exury tratará los datos personales de los Usuarios con las siguientes finalidades, cumpliendo con la normativa aplicable y garantizando su confidencialidad y seguridad:
                        </p>

                        <h4>2.2.1 Contratación de Productos y Servicios</h4>
                        <ul>
                        <li>
                            <strong>Compra de criptomonedas:</strong>
                            Gestionar la contratación de los productos y servicios ofrecidos a través del Sitio Web y la app, así como administrar la relación contractual entre Exury y los Usuarios. Durante este proceso, podrán recopilarse datos financieros, como información de tarjetas de crédito/débito o cuentas bancarias, para procesar los pagos. Estos datos serán comunicados exclusivamente a las entidades financieras encargadas de la gestión de los cobros, garantizando el cumplimiento de las finalidades legítimas y contractuales acordadas entre las partes.
                        </li>
                        <li>
                            <strong>Venta de criptomonedas (exclusivo para cuentas bancarias de la zona SEPA):</strong>
                            Facilitar el proceso de venta de criptomonedas a los clientes, gestionar la relación contractual con Exury, y emitir las facturas correspondientes. Para ejecutar la transacción, se recopilarán datos personales y financieros (como el número de cuenta bancaria del cliente) con el propósito de transferir los fondos directamente a la cuenta designada.
                        </li>
                        </ul>

                        <h4>2.2.2 Publicidad de Productos y Servicios Propios</h4>
                        <p>
                        Exury podrá utilizar los datos personales de los Usuarios para enviarles comunicaciones comerciales relativas a los servicios y productos ofrecidos, siempre en los términos establecidos en el apartado 3 de esta Política de Privacidad. Dichas comunicaciones se realizarán de manera acorde a la normativa aplicable y, cuando sea requerido, con el consentimiento explícito del Usuario.
                        </p>

                        <h4>2.2.3 Elaboración de Perfiles mediante Fuentes Externas</h4>
                        <p>
                        Exury podrá llevar a cabo procesos de perfilado basados en información proporcionada por terceros, utilizando técnicas avanzadas de análisis de datos, segmentación estadística y estudios de mercado. Esto permitirá personalizar las ofertas y servicios según las características y necesidades específicas de los Usuarios. Este perfilado no incluirá decisiones automatizadas que puedan tener efectos jurídicos o significativos sobre el Usuario.
                        </p>
                        <p>
                        En todos los casos, los tratamientos descritos se basan en el principio de legitimidad, asegurando que las finalidades indicadas se ajusten al consentimiento explícito del Usuario, a la ejecución de un contrato o al interés legítimo de Exury, de conformidad con el Reglamento General de Protección de Datos (RGPD).
                        </p>

                        <h3>2.3. Conservación de los Datos</h3>
                        <p>
                        Exury garantiza a sus Usuarios que los datos personales proporcionados serán almacenados únicamente durante el tiempo estrictamente necesario para cumplir con las finalidades específicas para las que fueron recopilados. Este período de conservación estará sujeto a la normativa vigente en materia de protección de datos y al principio de minimización de datos, asegurando que solo se conserven los datos imprescindibles para cada propósito autorizado.
                        </p>

                        <h4>Criterios para la conservación de los datos:</h4>
                        <ul>
                        <li><strong>Cumplimiento de obligaciones legales:</strong> Conservación durante el período exigido por la normativa aplicable que regule la actividad, incluyendo obligaciones fiscales, contables y regulatorias.</li>
                        <li><strong>Duración de la relación contractual:</strong> Almacenamiento mientras persista la relación contractual entre el Usuario y Exury, incluyendo la gestión de cualquier responsabilidad derivada de la misma.</li>
                        <li><strong>Solicitudes de supresión:</strong> En los casos en que el Usuario ejerza su derecho a la supresión de datos, estos serán eliminados, salvo que exista una base legal que justifique su conservación.</li>
                        </ul>

                        <h4>Procedimiento de bloqueo y eliminación:</h4>
                        <p>
                        Una vez que los datos personales ya no sean necesarios para los fines previstos, Exury procederá a su bloqueo. Durante este período, los datos quedarán restringidos y únicamente accesibles para atender posibles requerimientos legales o regulatorios formulados por las autoridades competentes.
                        </p>
                        <p>
                        Finalizado el plazo legal de conservación, los datos serán eliminados de manera segura mediante métodos que garanticen su completa destrucción, respetando los estándares establecidos por la normativa aplicable.
                        </p>
                        <p>
                        Este enfoque asegura que el tratamiento y la conservación de los datos personales por parte de Exury cumplan con los principios de transparencia, confidencialidad y proporcionalidad exigidos por el Reglamento (UE) 2016/679 (RGPD) y otras normativas de protección de datos en vigor.
                        </p>
                        <h3>2.4. Derechos de los Usuarios</h3>
                        <p>Los Usuarios tienen el derecho de ejercer, en cualquier momento y de forma gratuita, los derechos reconocidos por la normativa vigente en materia de protección de datos personales. Estos derechos incluyen:</p>
                        <ul>
                            <li><strong>Acceso:</strong> Solicitar confirmación sobre si Exury está tratando sus datos personales y obtener información detallada sobre dichos tratamientos.</li>
                            <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
                            <li><strong>Supresión ("derecho al olvido"):</strong> Solicitar la eliminación de sus datos personales cuando estos ya no sean necesarios para los fines para los que fueron recogidos o cuando se haya retirado el consentimiento.</li>
                            <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias, como el envío de comunicaciones comerciales.</li>
                            <li><strong>Limitación del tratamiento:</strong> Solicitar que sus datos sean únicamente conservados para el ejercicio o la defensa de reclamaciones legales.</li>
                            <li><strong>Portabilidad:</strong> Solicitar la transferencia de sus datos personales a otro responsable del tratamiento, en un formato estructurado, de uso común y lectura mecánica.</li>
                        </ul>

                        <h4>2.4.1 Procedimiento para el ejercicio de derechos</h4>
                        <p>Para garantizar la seguridad y legitimidad en el ejercicio de estos derechos, será necesario que el Usuario acredite su identidad. El ejercicio deberá formalizarse mediante una comunicación escrita, firmada por el titular de los datos, indicando su domicilio y adjuntando copia de su Documento Nacional de Identidad (DNI) u otro documento de identificación válido.</p>
                        <p>Las solicitudes podrán ser enviadas por los siguientes medios:</p>
                        <ul>
                            <li><strong>Correo electrónico:</strong> Enviar un mensaje a <a href="mailto:contact@exury.co">contact@exury.co</a>.</li>
                            <li><strong>Correo postal:</strong> Dirigir la comunicación escrita a la siguiente dirección:<br>
                            DIVISY APP S.L<br>
                            Calle Hermosilla 48, 1ra Derecha,<br>
                            28001 Madrid, España
                            </li>
                        </ul>

                        <h4>2.4.2 Retirada del consentimiento y comunicaciones comerciales</h4>
                        <p>El Usuario tiene derecho a oponerse al envío de comunicaciones comerciales por parte de Exury y a retirar su consentimiento en cualquier momento. La retirada del consentimiento no afectará la licitud del tratamiento realizado con anterioridad para otras finalidades legítimas.</p>

                        <h4>2.4.3 Delegado de Protección de Datos (DPD)</h4>
                        <p>Para garantizar una adecuada gestión de los datos personales, Exury ha designado un Delegado de Protección de Datos (DPD), quien estará disponible para resolver cualquier duda o reclamación relacionada con el tratamiento de datos. Podrá contactarse a través del correo electrónico: <a href="mailto:contact@exury.co">contact@exury.co</a>.</p>

                        <h4>2.4.4 Reclamaciones ante la autoridad de control</h4>
                        <p>Exury informa a los Usuarios de su derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideran que no han sido atendidos adecuadamente en el ejercicio de sus derechos o detectan un incumplimiento de la normativa de protección de datos.</p>

                        <!-- Sección 2.5 -->
                        <h3>2.5. Datos Compartidos con Terceras Partes</h3>
                        <p>Exury informa a los Usuarios que sus datos personales podrán ser accesibles, exclusivamente, por las siguientes categorías de destinatarios:</p>
                        <ul>
                            <li><strong>Empleados Autorizados por Exury:</strong> Solo aquellos empleados que estén debidamente habilitados y cuenten con permisos específicos podrán acceder a los datos personales, siempre en el marco de sus funciones y responsabilidades.</li>
                            <li><strong>Terceros y Colaboradores:</strong> Entidades externas que presten servicios a Exury, tales como proveedores tecnológicos, servicios financieros, y otros necesarios para la correcta ejecución de las actividades contratadas, podrán acceder a los datos en la medida en que sea indispensable para la prestación de dichos servicios.</li>
                        </ul>

                        <h4>2.5.1 Confidencialidad y Limitación del Uso de los Datos</h4>
                        <p>Exury garantiza que todos los datos personales serán tratados con la más estricta confidencialidad, asegurando que ningún tercero acceda o utilice esta información para finalidades distintas de las autorizadas. En ningún caso, Exury compartirá la información personal de los Usuarios con terceros fuera de las categorías mencionadas, salvo en los siguientes supuestos:</p>
                        <ul>
                            <li>Cuando exista el consentimiento explícito del Usuario.</li>
                            <li>En respuesta a requerimientos válidos de autoridades gubernamentales.</li>
                            <li>En cumplimiento de obligaciones legales, normativas o mandatos judiciales.</li>
                        </ul>

                        <h4>2.5.2 Transferencias Internacionales de Datos</h4>
                        <p>En caso de que sea necesario realizar transferencias internacionales de datos a terceros países u organizaciones internacionales, Exury garantiza que dichas transferencias se realizarán únicamente hacia jurisdicciones que cuenten con una decisión de adecuación emitida por la Comisión Europea, asegurando un nivel de protección adecuado de los datos personales conforme a la normativa aplicable.</p>
                        <p>Exury se compromete a implementar todas las medidas técnicas y organizativas necesarias para proteger los datos de los Usuarios en cualquier circunstancia en que sean compartidos o transferidos.</p>
                        <h4>2.6.1 Finalidad de los Enlaces</h4>
                        <p>Los hiperenlaces proporcionados en el Sitio Web tienen como único propósito ofrecer al Usuario acceso a recursos adicionales y fuentes de información relevantes, con el objetivo de complementar y ampliar los datos facilitados por Exury.</p>
                        <h4>2.6.2 Exclusión de Responsabilidad</h4>
                        <p>Exury no asume responsabilidad alguna por:</p>
                        <ul>
                            <li>El contenido, la funcionalidad, los servicios ofrecidos o la fiabilidad de los sitios web de terceros.</li>
                            <li>Los resultados obtenidos a través del uso de dichos hiperenlaces.</li>
                            <li>Cualquier consecuencia derivada de la interacción del Usuario con estos sitios web, incluyendo transacciones comerciales, registros u otros procesos realizados fuera del ámbito de Exury.</li>
                        </ul>
                        <p>Recomendamos a los Usuarios que, antes de proporcionar información personal o realizar cualquier acción en sitios web de terceros, revisen cuidadosamente sus políticas de privacidad y términos de uso, garantizando así un manejo adecuado de su información.</p>
                

                    </div>
                </div>
            </div>
            <!-- Envío de Comunicaciones -->
            <div class="policy-section" id="envio-comunicaciones">
                <div class="mdc-card section-card">
                    <h2 @click="toggle('envio-comunicaciones')" class="expandable-title mdc-typography--headline5">
                        3. Envío de Comunicaciones <span :class="{'expanded': expandedSection === 'envio-comunicaciones'}">▼</span>
                    </h2>
                    <div v-if="expandedSection === 'envio-comunicaciones'" class="mdc-typography--body1 justified-text">
                        <p>
                            Exury podrá remitir comunicaciones comerciales relacionadas con sus productos y servicios, así como los ofrecidos por sus colaboradores, exclusivamente a aquellos Usuarios que hayan otorgado su consentimiento de forma previa, expresa y específica. Este consentimiento se recogerá mediante la marcación de una casilla habilitada a tal efecto durante el proceso de registro o a través de cualquier otro medio que permita una manifestación inequívoca de aceptación por parte del Usuario.
                        </p>
                        <!-- Sub-sección 3.1 Derecho de Renuncia -->
                        <h3 class="mdc-typography--subtitle1">3.1 Derecho de Renuncia</h3>
                        <p>El Usuario tiene el derecho de oponerse en cualquier momento al envío de comunicaciones comerciales por parte de Exury. Para ejercer este derecho, podrá:</p>
                        <ul>
                            <li><strong>I. Enviar un correo electrónico:</strong> Dirigirse a <a href="mailto:contact@exury.co">contact@exury.co</a>, manifestando claramente su intención de renunciar a la recepción de dichas comunicaciones.</li>
                            <li><strong>II. Utilizar la opción incluida en cada comunicación:</strong> Todas las comunicaciones comerciales enviadas por Exury incluirán un enlace o mecanismo que permitirá al Usuario darse de baja de forma rápida y sencilla.</li>
                        </ul>
                        <p>
                            Exury se compromete a procesar estas solicitudes en el menor tiempo posible, garantizando así el pleno respeto de los derechos del Usuario y el cumplimiento de la normativa vigente en materia de protección de datos.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Uso de Cookies -->
            <div class="policy-section" id="uso-cookies">
                <div class="mdc-card section-card">
                    <h2 @click="toggle('uso-cookies')" class="expandable-title mdc-typography--headline5">
                        4. Uso de Cookies <span :class="{'expanded': expandedSection === 'uso-cookies'}">▼</span>
                    </h2>
                    <div v-if="expandedSection === 'uso-cookies'" class="mdc-typography--body1 justified-text">
                        <p>
                            De acuerdo con lo establecido en nuestra Política de Cookies, Exury utiliza cookies y tecnologías similares, como balizas web, píxeles, etiquetas de anuncios e identificadores de dispositivos, con el propósito de identificar al Usuario y/o sus dispositivos en distintos servicios y plataformas. Estas tecnologías permiten optimizar la experiencia del Usuario, personalizar contenidos y analizar el uso del Sitio Web o de la app.
                        </p>
                        <p>
                            Asimismo, Exury puede permitir que terceros implementen cookies bajo los términos y condiciones establecidos en la Política de Cookies, con finalidades como la mejora de servicios, la personalización de publicidad o la recopilación de estadísticas.
                        </p>
                        <!-- Sub-sección 4.1 Gestión y Control de Cookies -->
                        <h3 class="mdc-typography--subtitle1">4.1 Gestión y Control de Cookies</h3>
                        <p>El Usuario puede gestionar las cookies mediante:</p>
                        <ul>
                            <li><strong>I. Configuración del navegador:</strong> Ajustar las preferencias del navegador para aceptar, bloquear o eliminar cookies según su conveniencia.</li>
                            <li><strong>II. Herramientas adicionales:</strong> Utilizar herramientas externas diseñadas para la gestión de cookies y tecnologías de seguimiento.</li>
                            <li><strong>III. Bloqueo inicial de cookies:</strong> Desde el inicio de la navegación en el Sitio Web o la app, el Usuario tiene la opción de bloquear la activación de cookies y tecnologías de seguimiento, evitando que Exury recopile información comportamental.</li>
                        </ul>
                        <p>
                            Exury recuerda a los Usuarios que algunas funcionalidades del Sitio Web o de la app pueden verse afectadas si se restringe el uso de cookies o tecnologías similares. Para más información, consulte nuestra <a href="/politica-de-cookies">Política de Cookies</a>.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Menores de Edad -->
            <div class="policy-section" id="menores-edad">
                <div class="mdc-card section-card">
                    <h2 @click="toggle('menores-edad')" class="expandable-title mdc-typography--headline5">
                        5. Menores de Edad <span :class="{'expanded': expandedSection === 'menores-edad'}">▼</span>
                    </h2>
                    <div v-if="expandedSection === 'menores-edad'" class="mdc-typography--body1 justified-text">
                        <p>
                            Los servicios ofrecidos a través del Sitio Web y la app están exclusivamente dirigidos a personas mayores de edad. En consecuencia, aquellos que no cumplan esta condición deberán abstenerse de proporcionar información personal en dichas plataformas. Cualquier dato personal que sea identificado como proporcionado por un menor será eliminado de forma inmediata de las bases de datos de Exury.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Limitación de Responsabilidad -->
            <div class="policy-section" id="limitacion-responsabilidad">
                <div class="mdc-card section-card">
                    <h2 @click="toggle('limitacion-responsabilidad')" class="expandable-title mdc-typography--headline5">
                        6. Limitación de Responsabilidad <span :class="{'expanded': expandedSection === 'limitacion-responsabilidad'}">▼</span>
                    </h2>
                    <div v-if="expandedSection === 'limitacion-responsabilidad'" class="mdc-typography--body1 justified-text">
                        <p>
                            Exury no se hace responsable del uso inadecuado que los Usuarios puedan dar a la información publicada en su Sitio Web o en la app. Además, dentro de los límites establecidos por la normativa aplicable, Exury no asume responsabilidad alguna por:
                        </p>
                        <ul>
                            <li>La falta de exactitud, integridad o actualización de los datos e informaciones proporcionados a través de estas plataformas.</li>
                            <li>Las posibles consecuencias derivadas de errores u omisiones en los contenidos publicados.</li>
                        </ul>
                        <p>
                            Se recomienda a los Usuarios verificar la exactitud y actualidad de la información antes de tomar decisiones basadas en ella.
                        </p>
                    </div>
                </div>
            </div>
            <!-- Propiedad Intelectual de la Marca -->
            <div class="policy-section" id="propiedad-intelectual">
                <div class="mdc-card section-card">
                    <h2 @click="toggle('propiedad-intelectual')" class="expandable-title mdc-typography--headline5">
                        7. Propiedad Intelectual de la Marca <span :class="{'expanded': expandedSection === 'propiedad-intelectual'}">▼</span>
                    </h2>
                    <div v-if="expandedSection === 'propiedad-intelectual'" class="mdc-typography--body1 justified-text">
                        <p>
                            Exury es una marca registrada bajo la titularidad de DIVISY APP S.L., en España. Como tal, está protegida por las leyes de propiedad intelectual e industrial aplicables. Queda estrictamente prohibido el uso de la marca por parte de terceros no autorizados. Exury se reserva el derecho de emprender acciones legales contra cualquier uso indebido o no autorizado de su marca.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PrivacyPolicy",
    data() {
      return {
        expandedSection: ''
      };
    },
    methods: {
      toggle(section) {
        this.expandedSection = this.expandedSection === section ? '' : section;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Material Design 2 (MD2) Palette */
  :root {
    --mdc-theme-primary: #1CBA75;
    --mdc-theme-secondary: #03dac6;
    --mdc-theme-background: #f5f5f5;
    --mdc-theme-surface: #ffffff;
  }
  
  /* Base styles */
  body {
    background-color: var(--mdc-theme-background);
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  /* Container */
  .container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Header */
  .policy-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .policy-header h1 {
    font-size: 2.25rem;
    font-weight: 400;
    color: var(--mdc-theme-primary);
    margin: 0;
  }
  
  .policy-date {
    font-size: 1rem;
    color: #555;
    margin: 5px 0 0;
  }
  
  /* Card and Section Styles */
  .mdc-card {
    background-color: var(--mdc-theme-surface);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }
  
  /* Title & Expandable Sections */
  .expandable-title {
    color: var(--mdc-theme-primary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .expandable-title:hover {
    color: #1CBA75;
  }
  
  .expandable-title .expanded {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
  
  /* Justified Text */
  .justified-text {
    text-align: justify;
    margin-bottom: 20px; /* Mayor espacio entre párrafos */
  }

  /* Párrafos dentro de las secciones */
.policy-section p {
  margin-bottom: 16px; /* Espacio inferior para cada párrafo */
}

/* Encabezados */
.mdc-typography--headline5,
.mdc-typography--subtitle1 {
    margin-bottom: 10px; /* Espacio inferior entre el encabezado y el párrafo siguiente */
}
  </style>
  