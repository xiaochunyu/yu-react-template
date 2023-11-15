import styles from './index.less'

interface IndexProps {
  iconName: string
  color?: string
}

const SvgIcon = (props: IndexProps) => (
  <svg className={styles.icon} aria-hidden='true'>
    <use xlinkHref={`#${props.iconName}`} fill={props.color} />
  </svg>
)

export default SvgIcon
