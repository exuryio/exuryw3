<template>
    <div class="terms-conditions mdc-typography">
        <div class="container">
            <header class="terms-header mdc-typography--headline4">
                <h1>Términos y Condiciones</h1>
                <p>Última actualización: 17 de diciembre de 2024</p>
            </header>
         
        <section class="terms-content">
          
          <!-- Información Legal -->
          <div class="terms-section" id="legal-information">
            <div class="mdc-card section-card">
              <h2 @click="toggle('legal-information')" class="expandable-title mdc-typography--headline5">
                1. Información Legal <span :class="{'expanded': expandedSection === 'legal-information'}">▼</span>
              </h2>
              <div v-if="expandedSection === 'legal-information'" class="mdc-typography--body1 justified-text">
                <p>
                  Bienvenido a Exury.io. Exury es una plataforma de intercambio de criptomonedas por moneda fiduciaria (fiat) sin custodia.
                  Al utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con estos términos,
                  no utilices la plataforma ni los servicios ofrecidos.
                </p>
                <p>
                  Los presentes Términos y Condiciones, aviso de riesgos, la Política de Privacidad, la Política de Cookies y cualesquiera
                  otras condiciones específicas publicadas en la presente web para la prestación de servicios por Exury, son aplicables a
                  toda persona con capacidad legal que contrate los servicios de Exury a través de la web o de la App (en adelante, la Plataforma).
                </p>
                <p>
                  En cumplimiento de la Ley de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE) y la Ley 10/2010
                  de Prevención de Blanqueo de Capitales, informamos que el presente sitio web, https://exury.io, así como su contenido es propiedad
                  de la entidad DIVISY APP S.L, registrada ante el Banco de España, como proveedor de cambio de moneda virtual por moneda fiduciaria
                  y viceversa, con número de registro E102, siendo su actividad principal proporcionar a través de la plataforma distintos servicios
                  de compra y venta de moneda virtual o criptoactivos.
                </p>
                <p>
                  <strong>Denominación Social:</strong> DIVISY APP, S.L., en adelante Exury<br>
                  <strong>Denominación Comercial:</strong> DIVISY<br>
                  <strong>Marca:</strong> exury® es una marca comercial de titularidad de DIVISY APP S.L registrada en España.<br>
                  <strong>Domicilio:</strong> Calle Hermosilla 48, 1ra Derecha, 28001 Madrid, España<br>
                  <strong>CIF:</strong> B-56826183<br>
                  <strong>Inscripción:</strong> Registro Mercantil de Madrid, Tomo 9.334, Folio 18, Inscripción 1, Hoja V-143.975<br>
                  <strong>Teléfono:</strong> +34 604 11 78 51
                </p>
                <p>
                  En caso de no aceptar estos términos y condiciones en los procesos de registro para la contratación de los servicios de Exury,
                  imposibilita la utilización de los servicios de la Plataforma de Exury.
                </p>
                <p>
                  Para cualquier consulta o reclamación relacionada con nuestros servicios, puedes contactarnos en info@exury.co.
                </p>
              </div>
            </div>
          </div>
         
          <!-- Objeto y Servicios -->
          <div class="terms-section" id="services">
            <div class="mdc-card section-card">
              <h2 @click="toggle('services')" class="expandable-title mdc-typography--headline5">
                2. Objeto y Servicios <span :class="{'expanded': expandedSection === 'services'}">▼</span>
              </h2>
              <div v-if="expandedSection === 'services'" class="mdc-typography--body1 justified-text">
                <p>
                  El objeto de estos términos es regular el uso de la plataforma Exury, que facilita el intercambio de criptomonedas por moneda fiduciaria para sus usuarios de forma segura y sin custodia. Exury ofrece los siguientes servicios y a través de:
                </p>
                <ul>
                  <li>La página web <a href="https://exury.io" target="_blank">https://exury.io</a></li>
                  <li>Servicio de cambio de moneda virtual por moneda fiduciaria y viceversa</li>
                  <li>Compra y venta de criptomonedas</li>
                  <li>Servicios de atención al cliente y soporte</li>
                </ul>
                <p>
                  Exury cumple con todas las normativas vigentes, incluyendo la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD).
                </p>
                <p>
                  El cliente o usuario se compromete a utilizar la plataforma de forma responsable, exonerando a Exury de cualquier responsabilidad derivada de un uso inadecuado, erróneo o ilegal de la plataforma webapp. Exury será responsable de la correcta prestación de los servicios a través de la Plataforma.
                </p>
                <!-- Documentos Relevantes -->
              <h3>2.1 Documentos Relevantes</h3>
                <p>Estos términos deben leerse junto con:</p>
                <ul>
                <li>Política de Privacidad</li>
                <li>Advertencia de Riesgos</li>
                <li>Política de Cookies</li>
                </ul>

                <!-- Entrada en Vigor -->
                <h3>2.2 Entrada en Vigor</h3>
                <p>
                Los Términos y Condiciones entrarán en vigor y, por tanto, serán de aplicación a Exury y el usuario, a partir del momento en que se cumplan las siguientes condiciones:
                </p>
                <ul>
                <li>Haber dado el usuario conformidad a las mismas clicando el botón "He leído y acepto los Términos y Condiciones" habilitados en la plataforma.</li>
                </ul>
                <p>
                No obstante, y en cumplimiento con lo establecido en el artículo 28 de la Ley 34/2002 de 11 de Julio de Servicios de la Sociedad de Información y de Comercio Electrónico (LSSI), en el plazo máximo de veinticuatro horas desde la entrada en vigor de los Términos y Condiciones, Exury confirmará la aceptación de las presentes Términos y Condiciones confirmando la entrada en vigor del contrato.
                </p>

                <!-- Condiciones y restricciones -->
                <h3>2.3 Condiciones y Restricciones</h3>
                <p>
                Exury podrá en cualquier momento y a su exclusivo criterio, rechazar cualquier transacción presentada a través de los Servicios, imponer límites sobre las cantidades de las transacciones permitidas a través de los Servicios o imponer cualquier otra condición o restricción sobre el uso de los Servicios sin previo aviso. En este sentido, se podría por ejemplo limitar el número de operaciones o restringir las transacciones desde ciertas ubicaciones.
                </p>

                <!-- Cancelaciones -->
                <h3>2.4 Cancelaciones</h3>
                <p>
                 El usuario solo puede cancelar un pedido iniciado o solicitud de servicio si dicha cancelación se produce antes de que Exury ejecute la transacción. Una vez que la orden o solicitud ha sido ejecutada, no puede cambiar, retirar o cancelar la autorización para que Exury realice dicha transacción o preste dicho servicio.
                </p>
                <p>
                Exury se reserva el derecho de rechazar cualquier solicitud de cancelación asociada con una orden una vez que haya enviado dicha orden. A diferencia de las órdenes de cambio, todos los intercambios son irreversibles una vez iniciados. Si bien podemos, a nuestro exclusivo criterio, revertir una operación bajo ciertas condiciones extraordinarias, un cliente no tiene derecho a una reversión de una operación.
                </p>
              </div>
            </div>
          </div>

          <!-- Enlaces a Terceros -->
          <div class="terms-section" id="third-party-links">
            <div class="mdc-card section-card">
              <h2 @click="toggle('third-party-links')" class="expandable-title mdc-typography--headline5">
                3. Enlaces a Terceros <span :class="{'expanded': expandedSection === 'third-party-links'}">▼</span>
              </h2>
              <div v-if="expandedSection === 'third-party-links'" class="mdc-typography--body1 justified-text">
                <p>
                  Nuestra plataforma puede contener enlaces a sitios web de terceros que no son operados ni controlados por Exury. Exury no tiene control sobre los contenidos, las políticas de privacidad o las prácticas de sitios web de terceros y no asume ninguna responsabilidad por ellos.
                </p>
                <p>
                  Le recomendamos que lea los términos y condiciones y las políticas de privacidad de los sitios web de terceros que visite. Al acceder a esos sitios web a través de nuestros enlaces, usted reconoce y acepta que Exury no será responsable de los daños o pérdidas causadas por el uso de los sitios de terceros.
                </p>
              </div>
            </div>
          </div>

                        
            <!-- Derechos y obligaciones de clientes o usuarios -->
            <div class="terms-section" id="client-rights-obligations">
            <div class="mdc-card section-card">
                <h2 @click="toggle('client-rights-obligations')" class="expandable-title mdc-typography--headline5">
                    4. Derechos y Obligaciones del Cliente o Usuario <span :class="{'expanded': expandedSection === 'client-rights-obligations'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'client-rights-obligations'" class="mdc-typography--body1 justified-text">
                    <h3>4.1 Elegibilidad</h3>
                    <p>
                        Para utilizar los servicios de Exury, los usuarios deben ser mayores de edad y cumplir con los requisitos legales de su jurisdicción. En los supuestos en los que el usuario acceda a la plataforma en nombre y representación de una persona jurídica, el usuario acepta y declara que tiene los poderes de representación suficientes como para vincular en la contratación de servicios a la persona jurídica o empresa que representa. En tales supuestos, de acceso a la plataforma de Exury o registro como persona Jurídica, empresa o profesional, toda solicitud de servicios que realice el usuario será imputable a la persona jurídica, y Exury presumirá que los mismos han sido realizados por ésta última.
                    </p>
                    <p>
                        Exury, con base a su política interna de admisión de clientes, verificará y aplicará las medidas necesarias de identificación de clientes, para registrar a usuarios en la plataforma. Los usuarios de países sancionados o de alto riesgo en los que el servicio esté prohibido no podrán utilizar la plataforma y sus servicios. [Listado de países clasificados de alto riesgo.]
                    </p>
                    <p>
                        La adquisición de la condición de usuario implica la lectura y aceptación expresa y sin reserva alguna de los términos integrantes de los presentes términos y condiciones, de la Política de Privacidad, del aviso de riesgos y de la política de cookies, que manifiesta haber conocido previamente a su aceptación, pudiendo ser almacenadas y reproducidas por éste. El Registro como usuario de la Plataforma de Exury es requisito imprescindible para la contratación de los servicios de la Plataforma de Exury.
                    </p>
                    <p>
                        El usuario podrá acceder a los servicios de la plataforma de Exury utilizando el nombre de usuario y contraseña, o registrándose con su correo electrónico o autenticándose vía biométrica, el acceso se generará durante el proceso de alta en el momento en que suscriba las presentes Términos y Condiciones.
                    </p>
                    <p>
                        Exury podrá bloquear el acceso y utilización de los servicios de la Plataforma de Exury cuando lo estime necesario por motivos de seguridad.
                    </p>

                    <h3>4.2 Veracidad de la Información</h3>
                    <p>
                        Los usuarios están obligados a proporcionar información verídica y completa durante el registro y los procesos de verificación, en cumplimiento con las normativas y medidas de debida diligencia (KYC) y la prevención de blanqueo de capitales.
                    </p>
                    <p>
                        La adquisición de la condición de Usuario para la prestación de los servicios ofrecidos por Exury es necesario que los usuarios que se den de alta en la Plataforma y aporten conforme a la Ley 10/2010, de 28 de abril, de prevención del blanqueo de capitales y de la financiación del terrorismo (en adelante LPBC) determinada información necesaria para el cumplimiento de las obligaciones de identificación formal del cliente. En función del servicio y el riesgo de las operaciones a realizar por el usuario, serán solicitados diferentes niveles de información, con objeto de permitir servicios con más funcionalidades y mayores umbrales económicos en las operaciones que quiera realizar el usuario final.
                    </p>
                    <p>
                        La información solicitada podrá consistir entre otros, en el número de teléfono móvil e importe de la operación, en el nombre y apellidos, el nombre de usuario y contraseña, la dirección de correo electrónico, el código de seguridad enviado al correo electrónico o código de seguridad requerido para la doble autenticación, la profesión y fecha de nacimiento, origen de los fondos, dirección de domicilio así como otros posibles datos o información necesaria según el tipo de transacción seleccionada por el usuario.
                    </p>
                    <p>
                        El tipo de usuario también determinará la información a solicitar dependiendo de si se trata de persona física o jurídica, requiriéndose información como, por ejemplo, DNI, tarjeta de residencia, tarjeta de identidad extranjera o pasaporte, facturas, videoconferencia, escrituras, estructura accionarial, acreditación de actividad empresarial, etc., en aplicación de lo establecido en la Ley 10/2010, de 28 de abril, de prevención del blanqueo de capitales y de la financiación del terrorismo y demás legislación aplicable si se considera oportuno.
                    </p>
                    <p>
                        Exury podrá en cualquier momento solicitar más información adicional con el objetivo de conocer más sobre el propósito e índole de la relación de negocios del usuario, pudiendo incluso realizarlo a través de un tercero. La falta de información o la existencia de indicios de Blanqueo de Capitales en los datos proporcionados permitirá a Exury la inmediata cancelación unilateral del contrato de prestación de servicios que les une.
                    </p>

                    <h3>4.3 Menores de Edad</h3>
                    <p>
                        Los menores de edad no pueden utilizar los servicios que Exury presta a través de la web o aplicación, por lo que cualquier solicitud de ingreso como miembro en Exury de un menor de dieciocho años (18) será denegada.
                    </p>

                    <h3>4.4 Uso Adecuado de la Cuenta</h3>
                    <p>
                        Los usuarios son responsables del uso adecuado de su cuenta y no deben compartir sus credenciales. Exury debe ser informada inmediatamente de cualquier actividad sospechosa.
                    </p>
                    <h3>4.4.1 Apertura de Cuenta</h3>
                    <p>
                    Para acceder a nuestros servicios, el usuario debes registrarte y proporcionar información precisa que permita identificar y verificar su identidad. Exury se reserva el derecho de rechazar registros.
                    </p>
                    <h3>4.5 Privacidad y Seguridad</h3>
                    <p>
                        Exury garantiza la protección de los datos personales de los usuarios en conformidad con el Reglamento General de Protección de Datos (RGPD) y la LOPDGDD. Exury tomará todas las medidas necesarias para salvaguardar la privacidad de los usuarios. Los usuarios son responsables de mantener la confidencialidad de sus credenciales. Exury utiliza medidas de seguridad como cifrado y autenticación de dos factores (2FA).
                    </p>
                    <p>
                        La Política de Privacidad de la web https://exury.io deberá ser aceptada conjuntamente con los presentes Términos y Condiciones. La información que el usuario proporcione a Exury es absolutamente necesaria y tiene como finalidad poder prestar los servicios necesarios para que el usuario, a través de la Plataforma, pueda realizar los servicios prestados por Exury. Los datos requeridos serán tratados conforme a la legislación aplicable en materia de protección de datos. La Política de Privacidad está accesible en el siguiente enlace la sección Política de Privacidad del sitio web.
                    </p>

                    <h3>4.6 Límite de Responsabilidad</h3>
                    <p>
                        El usuario acepta que las transacciones en la plataforma son definitivas y no pueden ser revertidas. Exury no será responsable de las pérdidas derivadas de errores imputables al usuario o por fluctuaciones en el valor de las criptomonedas.
                    </p>

                    <h3>4.7 Uso Adecuado de la Plataforma</h3>
                    <p>
                        El usuario se compromete a no utilizar la plataforma para actividades ilícitas. Cualquier actividad sospechosa debe ser reportada a Exury.
                    </p>

                    <h3>4.8 Impuestos</h3>
                    <p>
                        El usuario es responsable de determinar qué impuestos, si corresponde, se aplican a las operaciones que realice a través de los Servicios, y es su responsabilidad informar y remitir el impuesto correcto a la autoridad fiscal correspondiente. El usuario acepta que Exury no es responsable de determinar si los impuestos se aplican a sus operaciones o de recaudar, informar, retener o remitir los impuestos derivados de cualquier operación.
                    </p>

                    <h3>4.9 Otras Obligaciones</h3>
                    <p>
                        Facilitar la información requerida en los formularios en los casos señalados en los apartados anteriores al hacer una venta de criptomonedas.
                    </p>
                    <p>
                        Confirmar la aceptación de las presentes Términos y Condiciones mediante el clicado del botón "He leído y acepto las Términos y Condiciones".
                    </p>
                    <p>
                        Comunicar a Exury todos los datos necesarios para el acceso y utilización de los servicios que exijan identificación previa que deberán ser veraces, actuales y ajustados a la realidad.
                    </p>
                    <p>
                        Adoptar las medidas de seguridad necesarias, tanto personales como materiales, para mantener la confidencialidad de datos relevantes suministrados por Exury o sus partners, así como notificar inmediatamente a Exury la pérdida, extravío, sustracción, robo o acceso ilegítimo en su nombre y/o su conocimiento por terceras personas. El usuario acepta expresamente que cualquier uso del servicio realizado con sus credenciales de acceso ha sido realizado por él mismo.
                    </p>
                    <p>
                        Hacer un uso adecuado de los Servicios incluidos en la Plataforma Exury, siempre de conformidad con el ordenamiento jurídico.
                    </p>
                    <p>
                        A no llevar a cabo actividad alguna que dificulte o interfiera en el funcionamiento de los Servicios, incluidos en la Plataforma Exury.
                    </p>
                    <p>
                        A responsabilizarse por todas las operaciones que se hagan en su cuenta de usuario, exonerando de cualquier responsabilidad a Exury.
                    </p>
                </div>
            </div>
            </div>

            <!-- Duración del Contrato -->
            <div class="terms-section" id="contract-duration">
            <div class="mdc-card section-card">
                <h2 @click="toggle('contract-duration')" class="expandable-title mdc-typography--headline5">
                    5. Duración del Contrato <span :class="{'expanded': expandedSection === 'contract-duration'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'contract-duration'" class="mdc-typography--body1 justified-text">
                    <p>
                        Este contrato tiene una duración de un año desde su aceptación y firma, siendo prorrogable de forma AUTOMÁTICA por períodos de igual duración, indefinidamente, salvo que cualquiera de las partes comunique a la otra su intención de no prorrogar. No obstante, el usuario podrá en cualquier momento solicitar la terminación del contrato. En cualquier caso, el usuario no podrá rescindir el contrato hasta haber cumplido con todas sus obligaciones de pago a Exury.
                    </p>
                </div>
            </div>
            </div>

            <!-- Derechos y Obligaciones de Exury -->
            <div class="terms-section" id="rights-obligations-exury">
            <div class="mdc-card section-card">
                <h2 @click="toggle('rights-obligations-exury')" class="expandable-title mdc-typography--headline5">
                    6. Derechos y Obligaciones de Exury <span :class="{'expanded': expandedSection === 'rights-obligations-exury'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'rights-obligations-exury'" class="mdc-typography--body1 justified-text">
                    <h3>6.1 Derecho a Suspender Cuentas</h3>
                    <p>
                        Exury puede suspender o cerrar la cuenta de un usuario en caso de incumplimiento de los términos y condiciones, actividades sospechosas o por orden de las autoridades competentes en virtud de la Ley 10/2010 de prevención de blanqueo de capitales y financiación del terrorismo.
                    </p>
                    <h3>6.2 Seguridad y Confidencialidad</h3>
                    <p>
                        Exury implementa medidas técnicas y organizativas adecuadas para garantizar la seguridad de la plataforma, como el cifrado de datos y la autenticación de dos factores (2FA). Los datos personales serán tratados de acuerdo con el RGPD y la LOPDGDD.
                    </p>
                    <h3>6.3 Retención de Fondos</h3>
                    <p>
                        Para cumplir con la normativa de prevención de blanqueo de capitales, Exury se reserva el derecho de retener fondos hasta que se complete la verificación de identidad conforme a los requisitos KYC, o se aporte información adicional requerida por la plataforma.
                    </p>
                    <h3>6.4 Responsabilidad</h3>
                    <p>
                        Exury no será responsable por pérdidas derivadas de errores en las transacciones imputables al usuario o fluctuaciones en el valor de las criptomonedas. Las transacciones en la plataforma son definitivas y no se pueden revertir una vez confirmadas.
                    </p>
                    <p>
                        El usuario asegura que comprende y tiene el conocimiento necesario para utilizar sistemas y servicios blockchain, y que es plenamente consciente de los riesgos asociados con la compra y venta de criptomonedas y el uso de la blockchain. Exury no será responsable de ninguna pérdida de criptomonedas ni divisas tradicionales o situaciones que imposibiliten el acceso a las mismas, que puedan resultar de cualquier acción u omisión del usuario.
                    </p>
                    <p>
                        El usuario acepta que la compra/venta de criptomonedas puede implicar un riesgo elevado, debido a las fluctuaciones de precio que pueden conllevar el aumento o la pérdida parcial o total de la inversión. El usuario reconoce el riesgo que supone la venta de criptomonedas, por lo que Exury no tendrá ningún tipo de responsabilidad en cuanto a las pérdidas o ganancias en las que el usuario incurra al vender sus criptomonedas a Exury.
                    </p>
                    <p>
                        Las transacciones en criptomonedas son irreversibles, por lo que el usuario deberá adoptar las máximas precauciones a la hora de realizar el pago o facilitar una dirección pública de su cartera correcta. El usuario no reclamará a Exury ninguna cantidad en divisa virtual o divisas tradicionales que sean enviadas desde su cuenta de usuario.
                    </p>
                    <p>
                        Exury no asume ningún tipo de responsabilidad por fallos en la red de internet, en las cadenas de bloque de las criptomonedas, bancos o por el ataque al software de cualquier hacker que tenga como consecuencia la pérdida o desaparición de las criptomonedas propiedad del usuario.
                    </p>
                    <p>
                        El usuario declara ser conocedor de todos los riesgos que supone la posesión de criptomonedas, por lo que exonera a Exury de cualquier responsabilidad por la pérdida de sus criptomonedas. Cualquier incidencia en la operativa de las entidades bancarias será responsabilidad exclusiva de las mismas.
                    </p>
                    <p>
                        Así mismo, cualquier incidente derivado del uso de los métodos de pago y recepción de dinero de curso legal será responsabilidad única del proveedor del mismo. No obstante lo anterior, en los supuestos en los que pueda ocurrir algún error durante el proceso de compra venta de criptomonedas, el usuario podrá contactar con el servicio de soporte de Exury en <a href="mailto:info@exury.co">info@exury.co</a>.
                    </p>
                    <h3>6.5 Otras obligaciones</h3>
                    <ul>
                        <li>Atender con la mayor diligencia posible todas las consultas que pueda ordenar el usuario derivadas de la utilización de los servicios incluidos en la página web.</li>
                        <li>Prestar el servicio al usuario conforme a lo establecido en las presentes CONDICIONES GENERALES.</li>
                        <li>Notificar cualquier movimiento que Exury pueda considerar sospechoso a efectos de comprometer la seguridad de la cuenta del usuario, para posterior análisis del mismo.</li>
                    </ul>
                </div>
            </div>
            </div>

            <!-- Precio y Forma de Pago -->
            <div class="terms-section" id="price-payment">
            <div class="mdc-card section-card">
                <h2 @click="toggle('price-payment')" class="expandable-title mdc-typography--headline5">
                    7. Precio y Forma de Pago <span :class="{'expanded': expandedSection === 'price-payment'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'price-payment'" class="mdc-typography--body1 justified-text">
                    <p>
                        Exury cobra comisiones por transacción, que se mostrarán de manera transparente antes de confirmar cualquier operación. Las comisiones pueden variar en función del tipo de operación y otros factores relacionados con la oferta del mercado, demanda de mercado y acuerdos con socios terceros.
                    </p>
                    <p>
                        Estas variables dan como resultado un tipo de cambio óptimo en tiempo real para cada una de las monedas soportadas y que será aplicado en las representaciones e intercambios realizados.
                    </p>
                    <p>
                        El pago de las comisiones se realiza directamente a través de la plataforma en el momento de la transacción. Se emitirán facturas solo si el usuario lo solicita, en cumplimiento con las disposiciones fiscales vigentes en España.
                    </p>
                    <p>
                        La remuneración que reciba Exury por la prestación de cualquier servicio incluido en estos Términos y Condiciones por cuenta del usuario, se incrementará en la cuantía correspondiente a cuantos impuestos, tasas y arbitrios sean aplicables según la legislación vigente. Es de exclusiva responsabilidad del usuario determinar si, y en qué medida, se aplican impuestos a cualquier transacción que realice a través de Exury, e informar o ingresar la cantidad correcta de impuestos a las autoridades fiscales correspondientes.
                    </p>
                    <p>
                        Información sobre la entidad de dinero electrónico, así como de las otras entidades, se encuentra en el siguiente enlace: <a href="https://exury.io/legal" target="_blank">https://exury.io/legal</a>.
                    </p>

                    <h3>7.1 Confirmación de Transacciones</h3>
                    <p>
                        Las transacciones son finales una vez confirmadas y no pueden ser revertidas. Exury no se responsabiliza por errores en la información proporcionada por el usuario.
                    </p>

                    <h3>7.2 Tarifas</h3>
                    <p>
                        Exury cobra comisiones por cada transacción, las cuales serán claramente indicadas antes de la confirmación.
                    </p>

                    <h3>7.3 Monedas Permitidas</h3>
                    <p>
                        La Plataforma soporta las principales criptomonedas del mercado tales como BTC, ETH, BNB, XRP, ADA, DOT, USDC, TUSD, DAI, BUSD, FDUSD, EURS, EURC, EURT, EURA, que pueden cambiar con el tiempo. Actualmente la única moneda de curso legal aceptada por Exury es el euro.
                    </p>
                </div>
            </div>
            </div>

            <!-- Límites económicos en las operaciones -->
            <div class="terms-section" id="economic-limits">
            <div class="mdc-card section-card">
                <h2 @click="toggle('economic-limits')" class="expandable-title mdc-typography--headline5">
                    8. Límites económicos en las operaciones <span :class="{'expanded': expandedSection === 'economic-limits'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'economic-limits'" class="mdc-typography--body1 justified-text">
                    <p>
                        Los usuarios de Exury podrán encontrar la información relativa a los límites de los servicios ofrecidos, así como 
                        el precio o comisiones de uso de los mismos accediendo a la sección de <a href="https://Exury/comisiones" target="_blank">Límites y Precios</a> de la web.
                    </p>
                </div>
            </div>
            </div>

            <!-- Servicios para transacción con euros -->
            <div class="terms-section" id="euro-transactions">
            <div class="mdc-card section-card">
                <h2 @click="toggle('euro-transactions')" class="expandable-title mdc-typography--headline5">
                    9. Servicios para transacción con euros <span :class="{'expanded': expandedSection === 'euro-transactions'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'euro-transactions'" class="mdc-typography--body1 justified-text">
                    <h3>9.1 Transacciones realizadas a través de Transferencias Bancarias</h3>
                    <p>
                        Para aquellos clientes que quieran realizar transacciones únicamente para la compra de criptomonedas, pueden transferir directamente los euros a las siguientes cuentas en países de Europa abiertas en las siguientes entidades:
                    </p>
                    <p>
                        <strong>REVOLUT LIMITED</strong>. Es muy importante señalar que Exury no se encarga de mantener los fondos transferidos por los usuarios en estas cuentas, dado que estos fondos únicamente se transfieren para realizar las operativas que el usuario ha ordenado en cada momento.
                    </p>
                    <p>
                        Por tanto, el usuario podrá realizar sus compras de criptomonedas a través de transferencias bancarias con dinero FIAT (euros), utilizando los servicios de transferencia bancaria facilitados por su propia entidad de crédito o de servicios de pago de su cuenta externa. En todas las transferencias bancarias deberá coincidir el ordenante y el beneficiario de las mismas con los datos previamente aportados por el usuario.
                    </p>
                    <p>
                        En caso de que fuese estrictamente necesario, Exury se reserva el derecho a detener temporalmente el adeudo o abono con el objetivo de recabar información adicional del usuario y el método de pago utilizado, llegando incluso a producirse la devolución del pago, pudiendo aplicarse a cuenta del usuario los costes derivados de la devolución. Los detalles de estas cuentas a las que los usuarios realizarán sus transferencias para la compra de sus criptomonedas son:
                    </p>
                    <ul>
                        <li>
                            <strong>REVOLUT LTD.</strong> (LEI: 213800NS2PAH5ON1IN94) es una institución financiera registrada en el Reino Unido bajo el número 08804411. Revolut está autorizada como una Institución de Dinero Electrónico (EMI) por la Financial Conduct Authority (FCA) con el número de licencia 900457. Además, la entidad opera bajo licencias similares en otros países donde proporciona sus servicios. Revolut ofrece una plataforma digital para pagos, cambio de divisas, criptomonedas y otros servicios financieros.
                        </li>
                        <li><a href="https://www.revolut.com" target="_blank">Leer más sobre REVOLUT LTD.</a></li>
                    </ul>
                    <h4>Tener en cuenta que:</h4>
                    <ol>
                        <li>La compra de criptomonedas a través de transferencia bancaria se puede realizar por el sistema SEPA (Single Euro Payments Area o Zona Única de Pagos en Euros) o por el sistema SWIFT (Society for Worldwide Interbank Financial Telecommunication).</li>
                        <li>Las transferencias SEPA se ejecutarán de acuerdo con el Reglamento UE n. 260/2012 y será la entidad de crédito del usuario quien ejecutará la transferencia. El usuario proporcionará todos los datos requeridos por la normativa vigente en cada momento por las entidades de crédito o de servicios de pago participantes en la operatoria. El usuario es responsable de la integridad y de la exactitud de los datos facilitados exonerando a Exury y al resto de entidades de crédito o de servicios de pago participantes en la operatoria de cualquier daño o reclamación resultante de los datos incorrectos o incompletos proporcionados.</li>
                        <li>La persona remitente/ordenante de la transferencia y el usuario registrado en Exury han de ser los mismos.</li>
                        <li>El usuario deberá poner la referencia completa pudiendo omitir el guion y/o punto de la referencia si su entidad de crédito o de servicio de pago no le permite poner esos caracteres.</li>
                        <li>El usuario ha de transferir el importe suficiente en euros para que la operación solicitada pueda ejecutarse por Exury en los términos indicados.</li>
                        <li>No se aceptan ingresos en efectivo.</li>
                        <li>El usuario no puede realizar transferencias de dinero desde países considerados como “paraísos fiscales”, ya que Exury y el resto de las entidades de crédito o de servicios de pago participantes en la operatoria cumplen con las medidas de diligencia debida indicadas en las Directivas y Reglamentos de la UE, así como la legislación española y europea en materia de la prevención del blanqueo de capitales y financiación del terrorismo.</li>
                        <li>Lista de países donde las transacciones SEPA pueden ser procesadas: Estados miembros de la Unión Europea (UE), Asociación Europea de Libre Comercio (EFTA) y Estados miembros que se han unido al Área de Pagos Europea (SEPA). Para conocer en todo momento el listado de países de la zona SEPA, se puede acceder a la siguiente web: <a href="https://www.sepaesp.es/sepa/es/secciones/enlaces/Listado_de_paise/" target="_blank">Listado de países SEPA</a>.</li>
                    </ol>
                    <h3>9.2 Transacciones con Tarjeta</h3>
                    <p>
                        Si el usuario desea comprar criptomonedas a cambio de dinero FIAT (euros) también podrá utilizar como medio de pago tarjetas de pago.
                    </p>
                    <p>
                        En caso de que fuese estrictamente necesario, Exury se reserva el derecho a detener temporalmente la operación solicitada por el usuario con el objetivo de recabar información adicional del usuario y el método de pago utilizado, llegando incluso a producirse la devolución del pago.
                    </p>
                </div>
            </div>
            </div>

            <!-- Servicio de compraventa -->
            <div class="terms-section" id="servicio-compraventa">
            <div class="mdc-card section-card">
                <h2 @click="toggle('servicio-compraventa')" class="expandable-title mdc-typography--headline5">
                    10. Servicio de compraventa <span :class="{'expanded': expandedSection === 'servicio-compraventa'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'servicio-compraventa'" class="mdc-typography--body1 justified-text">
                    <h3>10.1 Compra de criptomonedas</h3>
                    <p>
                        Exury permite la compra de criptomonedas. Una compra es un intercambio entre moneda corriente o de curso legal FIAT (euros) y criptomonedas. Como medios de pago para pagar el precio de la criptomoneda que se quiera adquirir por el usuario, Exury admite:
                    </p>
                    <ul>
                        <li>(i) el pago desde un Wallet de criptomoneda;</li>
                        <li>(ii) el pago con tarjeta;</li>
                        <li>(iii) transferencia bancaria.</li>
                    </ul>
                    <p>
                        La cotización viene determinada con el momento justo en el que la notificación de cobro es recibida en Exury, pudiendo ocurrir segundos después del pago.
                    </p>

                    <h3>10.2 Venta de criptomonedas</h3>
                    <p>
                        Exury permite la venta de criptomonedas. Una venta es un intercambio de criptomonedas a dinero FIAT (euros). Para ello el usuario ha de hacer una transferencia de la criptomoneda deseada a la wallet indicada por Exury en el momento de la operación e intercambiar esas criptomonedas por alguna moneda corriente o de curso legal (euros) soportada por Exury.
                    </p>
                    <p>
                        El usuario deberá indicar los datos de su cuenta externa bancaria en la que quiere recibir el dinero FIAT (euros) y verificar el resumen informativo de la operación antes de confirmar la orden de transferencia.
                    </p>
                    <p>
                        En los supuestos en los que, excepcionalmente, se realicen retiradas de dinero FIAT (euros) a una cuenta bancaria externa cuya titularidad no sea la misma del usuario, se deberá aprobar previamente por Exury. En este caso, el usuario será totalmente responsable de la transferencia realizada al destinatario, asumiendo la responsabilidad de cualquier delito cometido con dicha acción y eximiendo de cualquier responsabilidad a Exury.
                    </p>

                    <h3>10.3 Intercambio con criptomonedas</h3>
                    <p>
                        El usuario podrá intercambiar criptomonedas con Exury a través de las criptomonedas soportadas en Exury.
                    </p>
                    <p>
                        El usuario deberá mandar únicamente criptomonedas del tipo que la dirección de destino pueda recibir. Para ello Exury proporcionará la dirección de destino de la criptomoneda deseada.
                    </p>
                    <p>
                        El usuario acepta que Exury pueda cobrar determinados costes por dichas transferencias en función de lo estrictamente necesario, por ejemplo, coste de mineros, intercambios, etc. Exury no se responsabiliza si la dirección de destino indicada por el usuario en el formulario de intercambio es incorrecta o si no puede gestionar su clave privada que le autorice a operar con las criptomonedas recibidas.
                    </p>
                    <p>
                        Los intercambios de criptomonedas procedentes de la Plataforma Exury podrán ser comprobados en un explorador blockchain compatible. Por motivos de seguridad, los retiros con criptomonedas pueden ser revisados manualmente por el equipo de Exury, siendo procesado el envío a la red blockchain tras la revisión.
                    </p>
                </div>
            </div>
            </div>

            <!-- Riesgos de negociación -->
            <div class="terms-section" id="riesgos-negociacion">
            <div class="mdc-card section-card">
                <h2 @click="toggle('riesgos-negociacion')" class="expandable-title mdc-typography--headline5">
                    11. Riesgos de negociación <span :class="{'expanded': expandedSection === 'riesgos-negociacion'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'riesgos-negociacion'" class="mdc-typography--body1 justified-text">
                    <p>
                        El Usuario reconoce y acepta que deberá acceder y utilizar los Servicios bajo su propio riesgo. El riesgo de pérdida en el comercio de pares de criptomonedas y pares de criptomonedas y moneda corriente puede ser considerable. Por lo tanto, el usuario debe considerar cuidadosamente si dicha negociación es adecuada para él a la luz de sus circunstancias y recursos financieros. En cualquier caso, debe tener en cuenta los siguientes puntos:
                    </p>
                    <ul>
                        <li>Puede sufrir una pérdida total de los fondos en su Wallet y, en algunos casos, puede incurrir en pérdidas más allá de dichos fondos. Si el mercado se mueve en contra de su posición, es posible que le solicitemos que proporcione una cantidad sustancial de fondos de operaciones de mercado adicionales, a corto plazo, para mantener su posición. Si no proporciona los fondos requeridos dentro del tiempo requerido por nosotros, su posición puede liquidarse con pérdidas, y será el usuario el responsable de cualquier déficit resultante en su Wallet.</li>
                        <li>En determinadas condiciones del mercado, puede resultar difícil o imposible liquidar una posición. Esto puede ocurrir, por ejemplo, cuando el mercado alcanza un límite diario de fluctuación de precios ("movimiento límite"), si no hay suficiente liquidez en el mercado.</li>
                        <li>El uso del apalancamiento puede funcionar en su contra y puede generar grandes pérdidas y ganancias.</li>
                    </ul>
                    <p>
                        Para ver más sobre los riesgos asociados a la inversión en criptoactivos, consultar el siguiente enlace: <a href="https://exury.io/riesgos" target="_blank">Alerta de riesgos</a>.
                    </p>
                </div>
            </div>
            </div>

            <!-- Nulidad de Alguna Disposición -->
            <div class="terms-section" id="nulidad-disposicion">
            <div class="mdc-card section-card">
                <h2 @click="toggle('nulidad-disposicion')" class="expandable-title mdc-typography--headline5">
                    12. Nulidad de Alguna Disposición <span :class="{'expanded': expandedSection === 'nulidad-disposicion'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'nulidad-disposicion'" class="mdc-typography--body1 justified-text">
                    <p>
                        Si por cualquier causa alguna disposición de estos Terminos y Condiciones fuera considerada nula, esto no afectará al resto de las disposiciones del contrato que conservarán su vigencia por el plazo establecido.
                    </p>
                </div>
            </div>
            </div>

            <!-- Resolución de Disputas -->
            <div class="terms-section" id="resolucion-disputas">
            <div class="mdc-card section-card">
                <h2 @click="toggle('resolucion-disputas')" class="expandable-title mdc-typography--headline5">
                    13. Resolución de Disputas <span :class="{'expanded': expandedSection === 'resolucion-disputas'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'resolucion-disputas'" class="mdc-typography--body1 justified-text">
                    <p>
                        <strong>13.1 Arbitraje</strong>
                        <br>
                        Cualquier disputa será resuelta mediante arbitraje en Madrid, España, conforme a las reglas del tribunal de arbitramiento de Madrid. Los usuarios renuncian al derecho de presentar demandas colectivas.
                    </p>
                </div>
            </div>
            </div>

            <!-- Otras Disposiciones -->
            <div class="terms-section" id="otras-disposiciones">
            <div class="mdc-card section-card">
                <h2 @click="toggle('otras-disposiciones')" class="expandable-title mdc-typography--headline5">
                    14. Otras Disposiciones <span :class="{'expanded': expandedSection === 'otras-disposiciones'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'otras-disposiciones'" class="mdc-typography--body1 justified-text">
                    <p>
                        <strong>14.1 Exclusiones de responsabilidad</strong>
                        <br>
                        Los Servicios que se ofertan a través de la Plataforma Exury cumplen con lo dispuesto con el ordenamiento jurídico español. Exury no es responsable respecto de aquellos servicios que no sean conformes respecto a lo dispuesto en el ordenamiento jurídico de otros países a los que pudieran prestarse los servicios ofertados a través de la Plataforma Exury.
                        <br><br>
                        Exury queda liberada de cualquier responsabilidad en caso de un uso indebido o contrario al ordenamiento jurídico de la Plataforma Exury por parte del usuario. Exury no asumirá responsabilidad alguna por los daños, pérdidas que pudieran sufrir como consecuencia de sucesos que no hubieran podido preverse, o que previstos fueran inevitables, bien por caso fortuito o fuerza mayor. Exury no se hace responsable de cualquier fallo, error técnico, accidente, avería, manipulación, interrupción en el Servicio o cualquier otra incidencia que pudiera surgir en equipos o servicios técnicos ajenos a Exury cuyo uso sea necesario para la prestación del Servicio.
                        <br><br>
                        Exury no será responsable en los supuestos de indisponibilidad del Servicio por causas de fuerza mayor o suspensión temporal del mismo por razones técnicas. Exury no asume ningún tipo de responsabilidad por uso indebido de las credenciales de acceso del usuario, salvo que hubiera comunicado previamente su pérdida, robo o extravío, en cuyo caso el usuario debe proceder inmediatamente a cambiarlos a través de los procedimientos que Exury ha establecido al efecto. La contraseña reemplazada se cancelará como medio de identificación, al mismo tiempo que se genera la nueva. El usuario acepta expresamente que cualquier uso del servicio realizado con sus credenciales de acceso ha sido realizado por él mismo. Exury no es responsable de las pérdidas de fondos debido a engaños al usuario por parte de terceros, por ejemplo, una estafa pidiendo que se le pague en criptomonedas un servicio que nunca llega.
                        <br><br>
                        Exury prohíbe la compra de criptomoneda en Exury para el pago de un rescate que típicamente piden los ransomware (como por ejemplo Cryptolocker). En caso de encontrarse el usuario en esta situación nuestro equipo invita a todos los usuarios a contactar con la policía y jamás realizar el pago.
                        <br><br>
                        El usuario será responsable, de los daños y perjuicios que hubiere podido ocasionar a terceros, por los datos aportados, con carácter enumerativo y no limitativo como consecuencia de las siguientes actuaciones:
                        <ul>
                            <li>Utilización de datos no actualizados, falsos o que no se corresponden con la realidad.</li>
                            <li>Utilización por parte de terceros de las claves personales del usuario. Exury no recomienda invertir en criptomonedas a personas que no sean plenamente conscientes del servicio que están contratando y entiendan correctamente como se está prestando el mismo.</li>
                        </ul>
                    </p>
                    <p>
                        <strong>14.2 Cesión y Subrogación</strong>
                        <br>
                        El usuario no puede ceder sus derechos u obligaciones derivados de estos términos sin el consentimiento previo por escrito de Exury. Exury podrá ceder sus derechos y obligaciones a terceros sin necesidad de obtener el consentimiento del usuario, siempre que no afecte negativamente a los derechos de este.
                    </p>
                    <p>
                        <strong>14.3 Mantenimiento y suspensión temporal del servicio</strong>
                        <br>
                        Exury hará todo lo razonablemente posible para garantizar que el usuario pueda acceder a los servicios de conformidad con las presentes Términos y condiciones. Sin embargo, Exury podrá suspender temporalmente los servicios por motivos de mantenimiento o actualizaciones, y hará todo lo razonablemente posible para informarte sobre dicho Mantenimiento Programado. El usuario reconoce que esto puede no ser posible en casos de emergencia y acepta los riesgos asociados al hecho de que no siempre el usuario podrá acceder a las transacciones, o utilizarlas o llevarlas a cabo, con la Cuenta de Exury.
                        <br><br>
                        El servicio, por tanto, podrá ser interrumpido por Exury de forma temporal y sin previo aviso en aquellas tareas de mantenimiento que sean necesarias para el correcto funcionamiento de la Plataforma Exury.
                        <br><br>
                        Asimismo, el incumplimiento de las obligaciones que a continuación se enumeran, por parte del usuario de Exury conllevará la suspensión temporal del servicio en la Plataforma Exury en tanto en cuanto no se subsane por parte del usuario:
                        <ul>
                            <li>Falta de información adicional necesaria para la identificación del usuario de su operativa o del origen de sus fondos</li>
                            <li>No aceptar las posibles actualizaciones de los Términos y Condiciones o de la Política de Privacidad.</li>
                        </ul>
                        <br>
                        La suspensión del servicio produce las siguientes consecuencias:
                        <ul>
                            <li>Exury le comunicará su decisión de suspender temporalmente su actividad en la Plataforma, indicando el motivo de la suspensión, (salvo por una obligación legal de no hacerlo), requiriendo las acciones a realizar para regularizar la situación.</li>
                            <li>El usuario no tendrá acceso a la Plataforma durante este periodo y por tanto no podrá realizar ninguna operación en la misma.</li>
                            <li>Esta suspensión temporal pasa a ser definitiva a los TREINTA (30) días a contar a partir desde el comienzo de la suspensión temporal, si no se ha regularizado su situación o actualizado con la información necesaria para continuar operando en la Plataforma Exury. Transcurridos esos TREINTA (30) días sin regularizar la situación será bloqueado pasando a ser una “cuenta inactiva” aplicando Exury la normativa legal vigente o, en su caso, actuará conforme a lo ordenado por las autoridades competentes.</li>
                        </ul>
                    </p>
                </div>
            </div>
            </div>

            <!-- Cuentas Inactivas -->
            <div class="terms-section" id="cuentas-inactivas">
            <div class="mdc-card section-card">
                <h2 @click="toggle('cuentas-inactivas')" class="expandable-title mdc-typography--headline5">
                    15. Cuentas Inactivas <span :class="{'expanded': expandedSection === 'cuentas-inactivas'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'cuentas-inactivas'" class="mdc-typography--body1 justified-text">
                    <p>
                        Exury podrá declarar inactiva una cuenta que:
                        <ul>
                            <li>Lleve sin realizar transacciones en un periodo de más de 12 meses.</li>
                            <li>No inicie sesión en la cuenta por un periodo superior a 3 meses.</li>
                            <li>No responda a requerimientos y/o aporte documentación solicitada en un periodo de 30 días.</li>
                            <li>Sea imposible contactar con el cliente en un plazo superior al año.</li>
                        </ul>
                        <br>
                        Asimismo, y con anterioridad a declarar la cuenta inactiva, Exury procederá a remitir al Cliente dos notificaciones al respecto, mediando el plazo de un mes entre cada una de ellas. Si el Cliente no atiende a tales notificaciones, pasado el mes de la última notificación, la cuenta se declarará inactiva, pudiendo Exury realizar las siguientes acciones:
                        <ul>
                            <li>Después de cerrar una cuenta inactiva, no podrá reactivarla (es decir, tendrá que registrar una nueva cuenta de Exury si desea continuar utilizando los servicios de Exury).</li>
                        </ul>
                    </p>
                </div>
            </div>
            </div>

            <!-- Extinción y Resolución -->
            <div class="terms-section" id="extincion-resolucion">
            <div class="mdc-card section-card">
                <h2 @click="toggle('extincion-resolucion')" class="expandable-title mdc-typography--headline5">
                    16. Extinción y Resolución <span :class="{'expanded': expandedSection === 'extincion-resolucion'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'extincion-resolucion'" class="mdc-typography--body1 justified-text">
                    <p>
                        El presente contrato se extinguirá por las siguientes causas:
                        <ul>
                            <li><strong>a.</strong> Por no aceptación de la modificación de la Política de Privacidad, de los Términos y Condiciones o del precio del servicio, o cualquier ley y reglamento aplicable (incluyendo cualquier ley relativa a la lucha contra el blanqueo de capitales, la financiación del terrorismo, las sanciones económicas internacionales y los embargos): El contrato se extinguirá automáticamente.</li>
                            <li><strong>b.</strong> Por incumplimiento por alguna de las partes de alguna obligación esencial del contrato: La otra parte podrá resolver de forma unilateral el presente contrato.</li>
                            <li><strong>c.</strong> Por deseo expreso del usuario: El usuario podrá decidir en cualquier momento dar por finalizada la vigencia del presente contrato para lo que deberá comunicar su decisión a la siguiente dirección de correo electrónico: <a href="mailto:contacto@exury.io">contacto@exury.io</a>. Cuando el presente contrato se extinga por cualquier causa, el usuario no podrá solicitar a Exury que se deshaga de la operación o las operaciones efectuadas a lo largo de la relación contractual. Por tanto, no se podrán solicitar devoluciones de criptomonedas vendidas a Exury o restitución de efectivo (moneda de curso legal) alguna.</li>
                            <li><strong>d.</strong> Por la detección por parte de Exury de acciones fraudulentas, comportamientos antisociales o ilegales (como por ejemplo, insultos o amenazas).</li>
                            <li><strong>e.</strong> Si Exury tiene motivos razonables para sospechar que el usuario es víctima de un fraude, robo, ciberataque, extorsión, manipulación, violencia o chantaje.</li>
                            <li><strong>f.</strong> Por imposición legal o por orden de autoridad competente. Exury informará del motivo del cierre de la cuenta del usuario siempre y cuando no exista una obligación legal de no dar dicha información.</li>
                        </ul>
                    </p>
                </div>
            </div>
            </div>

            <!-- Protección de Datos -->
            <div class="terms-section" id="proteccion-datos">
            <div class="mdc-card section-card">
                <h2 @click="toggle('proteccion-datos')" class="expandable-title mdc-typography--headline5">
                    17. Protección de Datos <span :class="{'expanded': expandedSection === 'proteccion-datos'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'proteccion-datos'" class="mdc-typography--body1 justified-text">
                    <p>
                        Exury se compromete a cumplir con la LOPDGDD y el RGPD. Los datos personales serán tratados de forma confidencial y solo se utilizarán para los fines relacionados con la prestación del servicio.
                    </p>
                    <p>
                        Los servicios prestados por Divisy APP S.L requieren el tratamiento de datos personales. Divisy App S.L se compromete a proteger la privacidad y proporcionar una experiencia de usuario segura. Al contratar los servicios, el usuario acepta explícitamente el tratamiento de sus datos tal como se describe en la <a href="https://Exury.io/privacidad" target="_blank">Política de Privacidad</a> establecida por Exury.
                    </p>
                </div>
            </div>
            </div>

            <!-- Prevención de Blanqueo de Capitales -->
            <div class="terms-section" id="prevencion-blanqueo">
                <div class="mdc-card section-card">
                <h2 @click="toggle('prevencion-blanqueo')" class="expandable-title mdc-typography--headline5">
                    18. Prevención de Blanqueo de Capitales <span :class="{'expanded': expandedSection === 'prevencion-blanqueo'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'prevencion-blanqueo'" class="mdc-typography--body1 justified-text">
                    <p>
                        En cumplimiento con la Ley 10/2010, Exury implementa procedimientos de verificación de identidad (KYC) y diligencia debida. Los usuarios deben proporcionar la documentación requerida para validar su identidad y origen de fondos.
                    </p>
                    <p>
                        Exury cumple íntegramente con la normativa vigente en materia de prevención de blanqueo de capitales y demás normativa complementaria. A tal efecto, Exury le informa que dicha normativa exige, entre otras obligaciones, la de identificar documentalmente a sus usuarios, recabar información sobre la naturaleza de su actividad profesional o empresarial e informar, bien a instancias del Servicio Ejecutivo de la Comisión de Prevención del Blanqueo de Capitales e Infracciones Monetarias, bien de oficio, de cualquier hecho u operación respecto al que exista indicio o certeza de que está relacionado con el blanqueo de capitales.
                    </p>
                </div>
            </div>
            </div>

            <!-- Ley Aplicable y Jurisdicción -->
            <div class="terms-section" id="ley-aplicable">
            <div class="mdc-card section-card">
                <h2 @click="toggle('ley-aplicable')" class="expandable-title mdc-typography--headline5">
                    19. Ley Aplicable y Jurisdicción <span :class="{'expanded': expandedSection === 'ley-aplicable'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'ley-aplicable'" class="mdc-typography--body1 justified-text">
                    <p>
                        Estos términos y condiciones se rigen por las leyes de España. Cualquier controversia derivada de su interpretación o aplicación será resuelta por los tribunales competentes de Madrid, España.
                    </p>
                </div>
            </div>
            </div>

            <!-- Servicio de Atención al Usuario -->
            <div class="terms-section" id="servicio-atencion-usuario">
            <div class="mdc-card section-card">
                <h2 @click="toggle('servicio-atencion-usuario')" class="expandable-title mdc-typography--headline5">
                    20. Servicio de Atención al Usuario <span :class="{'expanded': expandedSection === 'servicio-atencion-usuario'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'servicio-atencion-usuario'" class="mdc-typography--body1 justified-text">
                    <p>
                        El usuario dispone de un Servicio de Atención al Usuario para que pueda contactar directamente con un agente en la siguiente dirección: 
                        <a href="https://exury.io/support/home" target="_blank">https://exury.io/support</a>
                    </p>
                </div>
            </div>
            </div>

            <!-- Propiedad Intelectual -->
            <div class="terms-section" id="propiedad-intelectual">
            <div class="mdc-card section-card">
                <h2 @click="toggle('propiedad-intelectual')" class="expandable-title mdc-typography--headline5">
                    21. Propiedad Intelectual <span :class="{'expanded': expandedSection === 'propiedad-intelectual'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'propiedad-intelectual'" class="mdc-typography--body1 justified-text">
                    <p>
                        Todo el contenido y la tecnología utilizados en la plataforma son propiedad de Exury o sus licenciantes, la titularidad de los diferentes elementos de la web, como el logo, los contenidos, las imágenes, etc., así como de los productos o servicios que se puedan comercializar en ella y el uso que se permite de los mismos. Los usuarios no tienen derecho a copiar, modificar o distribuir sin autorización.
                    </p>
                    <p>
                        El diseño, imágenes, rótulos, signos distintivos, nombre comercial, las marcas, logos, productos y servicios que contiene Exury se encuentran protegidos por ley de Propiedad Industrial.
                    </p>
                    <p>
                        El acceso a esta Plataforma Exury no otorga a los usuarios derecho, ni titularidad alguna sobre los derechos de propiedad intelectual o industrial ni de los contenidos que alberga. Los usuarios que accedan a esta Plataforma Exury no podrán copiar, modificar, distribuir, transmitir, reproducir, publicar, ceder ni vender los elementos anteriormente mencionados o crear nuevos productos o servicios derivados de la información obtenida sin que medie autorización expresa y por escrito de Exury. Queda terminantemente prohibida la alteración del contenido o estructura de esta Plataforma Exury por parte del usuario.
                    </p>
                    <p>
                        Exury se reserva la posibilidad de ejercer las acciones judiciales que correspondan contra los usuarios que violen o infrinjan los derechos de propiedad intelectual e industrial.
                    </p>
                </div>
            </div>
            </div>

            <!-- Facturación -->
            <div class="terms-section" id="facturacion">
            <div class="mdc-card section-card">
                <h2 @click="toggle('facturacion')" class="expandable-title mdc-typography--headline5">
                    22. Facturación <span :class="{'expanded': expandedSection === 'facturacion'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'facturacion'" class="mdc-typography--body1 justified-text">
                    <p>
                        En relación con los servicios para la compraventa de criptomonedas o criptoactivos que presta Exury, y en virtud de lo dispuesto en el artículo 20, apartado uno, ordinal 18º, letra m) de la Ley 37/1992, tales servicios de mediación se encuentran exentos del Impuesto sobre el Valor Añadido y por tanto:
                    </p>
                    <p>
                        No existirá obligación de expedir factura, salvo en los supuestos contenidos en el apartado 2 del artículo 2 de este Reglamento, por las operaciones siguientes:
                    </p>
                    <ul>
                        <li>Las operaciones exentas del Impuesto sobre el Valor Añadido, en virtud de lo establecido en el artículo 20 de su ley reguladora, con excepción de las operaciones a que se refiere el apartado 2 siguiente.</li>
                    </ul>
                    <p>
                        No obstante, la expedición de factura será obligatoria en las operaciones exentas de este Impuesto de acuerdo con el artículo 20. Uno. 2.º, 3.º, 4.º, 5.º, 15.º, 20.º, 22.º, 24.º, 25.º y 28.º de la Ley del Impuesto.
                    </p>
                    <p>
                        Solamente expedimos factura y copia de esta en todo caso en las operaciones en las que el destinatario sea una empresa o profesional que actúe como tal, con independencia del régimen de tributación al que se encuentre acogido el empresario o profesional que realice la operación. Para ello el cliente deberá solicitar a Exury dicha factura, y en el plazo de 60 días laborables máximo le será entregada.
                    </p>
                </div>
            </div>
            </div>

    
            <!-- Modificaciones -->
            <div class="terms-section" id="modificaciones">
            <div class="mdc-card section-card">
                <h2 @click="toggle('modificaciones')" class="expandable-title mdc-typography--headline5">
                    23. Modificaciones <span :class="{'expanded': expandedSection === 'modificaciones'}">▼</span>
                </h2>
                <div v-if="expandedSection === 'modificaciones'" class="mdc-typography--body1 justified-text">
                    <p>
                        Exury se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán publicadas en el sitio web y entrarán en vigor inmediatamente.
                    </p>
                    <p>
                        Exury se reserva el derecho a modificar los presentes Términos y Condiciones sin previo aviso. Cuando los cambios y modificaciones que sean realizados sean relevantes, serán notificadas a los usuarios, quedando bajo la responsabilidad del usuario revisar estos Términos y Condiciones accesibles en <a href="https://exury.io" target="_blank">https://exury.io</a>.
                    </p>
                    <p>
                        A dichos efectos, se considerará que el usuario acepta plenamente las nuevas Términos y Condiciones si transcurrido el plazo de un mes desde que se ponga a disposición de todos los usuarios la modificación de las Términos y Condiciones, el usuario no ha solicitado la baja o cancelado el servicio.
                    </p>
                    <p>
                        El usuario podrá manifestar durante el plazo mencionado que no está de acuerdo con los cambios realizados en los Términos y Condiciones, debiendo solicitar la cancelación o baja del servicio de Exury.
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
  name: "TermsConditions",
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
.terms-header {
  text-align: center;
  margin-bottom: 20px;
}

.terms-header h1 {
  font-size: 2.25rem; /* Desktop */
  font-weight: 400;
  color: var(--mdc-theme-primary);
  margin: 0;
}

.terms-header p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .terms-header h1 {
    font-size: 1.75rem; /* Reduce font size for smaller screens */
    line-height: 1.2;
    margin: 10px 0;
  }

  .terms-header p {
    font-size: 0.9rem; /* Reduce paragraph font size */
  }

  .container {
    padding: 15px; /* Reduce padding for smaller devices */
  }
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

/* Footer */
.terms-footer {
  text-align: center;
  margin-top: 40px;
  font-size: 0.9em;
  color: #777;
}

.terms-footer a {
  text-decoration: none;
  margin: 0 10px;
}

.terms-footer a:hover {
  text-decoration: underline;
}
</style>

