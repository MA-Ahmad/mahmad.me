import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Meta from './meta'

type Props = {
    children: ReactNode
    title?: string
    description?: string
}

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}

const Layout = ({ children, title, description }: Props): JSX.Element => (
    <div>
        <Meta title={title} description={description} />
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear' }}
            className="flex items-start w-full justify-center pt-28 md:pt-32 h-full"
        >
            {children}
        </motion.main>
    </div>
)

export default Layout
