# 🛢️ HMI - Visualización de Tanques con HTML5 Canvas

Este proyecto fue desarrollado como una exploración personal en tecnologías HMI/SCADA utilizando `HTML5 Canvas`. Comenzó como un reto a partir de una propuesta laboral que requería conocimientos en `canvas`, y terminó convirtiéndose en un proyecto complejo, profesional, modular y escalable.

---

## 🧠 Motivación

A principios de la semana vi una propuesta laboral en la que solicitaban conocimientos sobre la etiqueta `<canvas>` de HTML. En ese momento no tenía experiencia, pero me llamó la atención y decidí investigar. Descubrí que la empresa trabajaba con sistemas **HMI/SCADA**, un mundo totalmente nuevo para mí.

Comencé viendo un curso básico de hace algunos años, donde aprendí a usar líneas, curvas, curvas de Bézier y círculos. A partir de eso, decidí crear un primer elemento industrial: un **tanque de agua**.

---

## 🛠️ Funcionalidades implementadas

El proyecto simula el comportamiento visual de un tanque de agua, incluyendo:

- 🧊 **Volumen actual** del tanque en tiempo real (representado con un rectángulo azul).
- 🩶 **Capacidad vacía** representada con un rectángulo gris.
- 📏 **Regla graduada** que simula una escala en litros.
- 🏷️ **Nombre del tanque**, volumen en litros y porcentaje de ocupación.
- ⚠️ **Alertas automáticas** según el nivel:
  - **0%**: Alerta de *tanque vacío*.
  - **< 10%**: Alerta de *poco líquido*.
  - **> 90%**: Alerta de *tanque lleno*.
  - **100%**: Alerta de *derrame*.
- 🔴 **Indicador visual de estado** (círculo):
  - Verde: Todo en orden.
  - Rojo/Blanco parpadeante: Alguna alerta activa.

---

## 🧩 Arquitectura del Proyecto

El código está pensado de forma **modular y escalable**, permitiendo que múltiples tanques puedan ser representados en una misma interfaz. Cada tanque puede tener una configuración diferente (nombre, volumen máximo, volumen actual, etc.).

---

## 🧪 Tecnologías Utilizadas

- HTML5 Canvas
- TypeScript
- Lógica personalizada sin frameworks
- Asistencia de IA para diseño estructural

---

## 👨‍💻 Autor

Este proyecto fue desarrollado 100% desde cero, combinando autoaprendizaje, curiosidad técnica y asistencia puntual de IA. El objetivo fue no solo resolver un desafío técnico, sino hacerlo de forma clara, mantenible y orientada a producción.

---

## 🚧 Próximos pasos

- [ ] Incorporar visualización de presión y temperatura.
- [ ] Adaptar la interfaz a pantallas táctiles.
- [ ] Integrar sensores simulados o datos en tiempo real.
- [ ] Finalizar e integrar el nuevo módulo de **reloj industrial**.


---

## 📝 Licencia

Este proyecto está bajo licencia MIT. Podés usarlo, modificarlo y adaptarlo libremente.

