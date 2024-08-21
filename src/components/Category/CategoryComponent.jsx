import React from 'react';
import styles from './Category.module.scss'
import Fold from "@/assets/Svg/fold.svg";
const Error = ({ children }) => <div className={styles.error}>{children}</div>;
const Loading = ({ children }) => <div className={styles.loading}>{children}</div>
const SectionContainer = ({ children }) => <div className={styles.sectionContainer}>{children}</div>
const TitleContainer = ({ children }) => <div className={styles.titleContainer}>{children}</div>
const Title = () => <h2 className={styles.title}></h2>
const ButtonsContainer = ({ children }) => <div className={styles.buttonsContainer}>{children}</div>
const BuyButton = ({ children }) => <div className={styles.buyButton}>{children}</div>
const SellButton = ({ children }) => <div className={styles.sellButton}>{children}</div>
const List = ({ children }) => <ul className={styles.list}>{children}</ul>
const ListItem = ({ children }) => <li className={styles.listItem}>{children}</li>
const FoldImg = () => <img className={styles.foldImg} src={Fold} alt="Fold" />
const ListItemWrapper = ({ children }) => <div className={styles.listItemWrapper}>{children}</div>
const ListItemImage = ({ src, alt, width, height }) => <img className={styles.listItemImage} src={src} alt={alt} width={width} height={height} style={{ objectFit: 'cover' }} />
const ListItemText = ({ children }) => <p className={styles.listItemText}>{children}</p>
export { Error, Loading, SectionContainer, TitleContainer, Title, ButtonsContainer, BuyButton, SellButton, List, ListItem, FoldImg, ListItemWrapper, ListItemImage, ListItemText, }
