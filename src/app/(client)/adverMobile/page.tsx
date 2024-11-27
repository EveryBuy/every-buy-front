// "use client";
// import Image from "next/image";
// import { Formik, Form, Field } from "formik";
// import { CommonButton } from "@/components";
// import ArowDown from "@/assets/Svg/icon-chevron-arow-down.svg";
// import Camera from "@/assets/Svg/camera.svg";
// import styles from "./adverMobile.module.scss";
// // import { AdverTextInput } from "@/components";
// // import { AdverPhotoList } from "@/components";

// const AdverMobile = () => {
//   const initialValues = {
//     product: "",
//     price: "",
//     description: "",
//     category: "",
//     subcategory: "",
//     location: "",
//     New: false,
//     Used: false,
//     New_mail: false,
//     Ukrposhta: false,
//     Meest_Express: false,
//   };
//   return (
//     <div className={styles.adWrapper}>
//       <ul className={styles.linkHeader}>
//         <li className={styles.linkItem}>
//           <p className={styles.linkItemText}>Куплю</p>
//         </li>
//         <li className={styles.linkItem}>
//           <p className={styles.linkItemText}>Продам</p>
//         </li>
//       </ul>

//       <h1 className={styles.adHeaderTitle}>Створити оголошення</h1>

//       {/* <div className={styles.adHeader}> */}
//       {/* <h1>Створити оголошення</h1> */}
//       {/* <ul className={styles.linkHeader}>
//           <li className={styles.linkItem}>
//             <p className={styles.linkItemText}>Куплю</p>
//           </li>
//           <li className={styles.linkItem}>
//             <p className={styles.linkItemText}>Продам</p>
//           </li>
//         </ul> */}
//       {/* </div> */}
//       {/* </div> */}

//       {/* <h3 className={styles.adTitle}>Подробиці товару</h3> */}

//       <Formik
//         initialValues={initialValues}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({ handleBlur }) => (
//           <Form autoComplete="off" className={styles.styledForm}>
//             <div className={styles.wrapperInput}>
//               {/* <AdverTextInput handleBlur={handleBlur} /> */}

//               {/* <AdverCheckboxGroup /> */}

//               <section className={styles.formWrapper}>
//                 <div>
//                   <div>
//                                         <label>
//                       Назва товару
//                       <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                       <Field
//                         className={styles.styledField}
//                         type="text"
//                         name="product"
//                         placeholder="Вкажіть назву товару"
//                         onBlur={handleBlur}
//                       />
//                     </label>
//                   </div>
//                 </div>

//                 <div className={styles.fieldWrapper}>
//                   <label>
//                     Категорія
//                     <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                     <Field
//                       className={styles.styledField}
//                       type="text"
//                       name="category"
//                       placeholder="зазначте категорію"
//                       onBlur={handleBlur}
//                     />
//                     <button type="button" className={styles.buttonInput}>
//                       <Image
//                         priority
//                         src={ArowDown}
//                         alt="icon down"
//                         width={24}
//                         height={24}
//                       />
//                     </button>
//                   </label>
//                 </div>

//                 <div className={styles.fieldWrapper}>
//                   <label>
//                     Підкатегорія
//                     <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                     <Field
//                       className={styles.styledField}
//                       type="text"
//                       name="subcategory"
//                       placeholder="зазначте підкатегорію"
//                       onBlur={handleBlur}
//                     />
//                     <button type="button" className={styles.buttonInput}>
//                       <Image
//                         priority
//                         src={ArowDown}
//                         alt="icon down"
//                         width={24}
//                         height={24}
//                       />
//                     </button>
//                   </label>
//                 </div>

//                 <div>
//                   <div>
//                     <label>
//                       Ціна
//                       <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                       <Field
//                         className={styles.styledField}
//                         type="text"
//                         name="price"
//                         placeholder="Вкажіть бажану ціну"
//                         onBlur={handleBlur}
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </section>

//               <section className={styles.checkboxWrapper}>
//                 <h2>
//                   Стан товару
//                   <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                 </h2>

//                 <div
//                   role="group"
//                   aria-labelledby="checkbox-group"
//                   className={styles.checkboxGroup}
//                 >
//                   <label className={styles.checkboxLabel}>
//                     <Field
//                       type="checkbox"
//                       name="New"
//                       // value="New"
//                       className={styles.checkboxInput}
//                     />
//                     Нове
//                   </label>
//                   <label className={styles.checkboxLabel}>
//                     <Field
//                       type="checkbox"
//                       name="Used"
//                       // value="Used"
//                       className={styles.checkboxInput}
//                     />
//                     Вживане
//                   </label>
//                 </div>
//               </section>

//               <div className={styles.adventPhotoItem}>
//                 <Image
//                   priority
//                   src={Camera}
//                   alt="icon down"
//                   width={114}
//                   height={91}
//                 />
//                 <p>Додати фото</p>
//               </div>

//               <div className={styles.textareaBox}>
//                 <label>
//                   Опис товару
//                   <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                   <Field
//                     as="textarea"
//                     name="description"
//                     rows="4"
//                     cols="50"
//                     className={`${styles.styledField} ${styles.styledTexterea}`}
//                   />
//                   <p className={styles.textareaText}>
//                     Вкажіть щонайменьше 30 символів
//                   </p>
//                 </label>
//               </div>
//               {/* </section> */}

//               <div
//                 className={`${styles.formWrapper} ${styles.formWrapperLocation}`}
//               >
//                 <label>
//                   Місцезнаходження
//                   <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                   <Field
//                     className={styles.styledField}
//                     type="text"
//                     name="location"
//                     placeholder="вкажшть назву Вашого міста"
//                     onBlur={handleBlur}
//                   />
//                 </label>
//               </div>

//               <section className={styles.checkboxWrapper}>
//                 <h2>
//                   Спосіб доставки
//                   <span style={{ color: "red", marginLeft: "4px" }}>*</span>
//                 </h2>

//                 <div
//                   role="group"
//                   aria-labelledby="checkbox-group"
//                   className={styles.checkboxGroup}
//                 >
//                   <label className={styles.checkboxLabel}>
//                     <Field
//                       type="checkbox"
//                       name="New_mail"
//                       // value="New_mail"
//                       className={styles.checkboxInput}
//                     />
//                     Нова пошта
//                   </label>
//                   <label className={styles.checkboxLabel}>
//                     <Field
//                       type="checkbox"
//                       name="Ukrposhta"
//                       // value="Ukrposhta"
//                       className={styles.checkboxInput}
//                     />
//                     Укрпошта
//                   </label>
//                   <label className={styles.checkboxLabel}>
//                     <Field
//                       type="checkbox"
//                       name="Meest_Express"
//                       // value="Meest_Express"
//                       className={styles.checkboxInput}
//                     />
//                     Meest Express
//                   </label>
//                 </div>
//               </section>
//               {/* </section> */}
//             </div>

//             <div className={styles.buttonWrapper}>
//               <CommonButton
//                 type="submit"
//                 title="Попередній перегляд"
//                 color="yellow"
//                 className={styles.adventButton}
//               />

//               <CommonButton
//                 type="submit"
//                 title="Опублікувати"
//                 color="yellow"
//                 className={styles.adventButtonAd}
//               />
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AdverMobile;
