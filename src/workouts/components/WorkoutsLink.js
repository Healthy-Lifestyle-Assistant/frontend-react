import '../styles/blocks/WorkoutsLink.scss';
import classNames from 'classnames';
import { NavLink, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

export const WorkoutsLink = ({ title, to }) => {
  const { pathname } = useLocation();
  console.log(pathname, to);
  return (
    <NavLink to={`..${to}`} className={({ isActive }) => classNames(
      'WorkoutsLink',
      { 'WorkoutsLink-active': isActive }
    )}>
      {title}
      {to === pathname && (
        <motion.div className="WorkoutsLink_underline" layoutId="underline" />
      )}
    </NavLink>
  );
};