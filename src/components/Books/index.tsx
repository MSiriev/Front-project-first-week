import basket from '../../assets/basket.png'
import style from './Books.module.css'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../../features/booksSlice'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import Pagination from '../Pagination/Index'
import { addBook } from '../../features/booksSlice'
import { addBookInBasket } from '../../features/basketSlica'
import Spinner from '../spinner'
import css from 'classnames'
import { BookSkeleton } from '../book-skeleton'

export const Books = () => {
	const { categoryId } = useParams()

	for (let i = 0; i < 10; i++) {
		console.log('asdad')
	}

	const dispatch = useDispatch()
	const currentPage = useSelector((state) => state.books.currentPage)
	const perPage = useSelector((state) => state.books.perPage)
	const isLoading = useSelector((state) => state.books.isLoading)

	useEffect(() => {
		dispatch(fetchBooks())
	}, [])

	const books = useSelector((state) =>
		state.books.books.filter((item) => {
			if (!categoryId) {
				return item
			}

			return item.categoryId._id === categoryId
		}),
	)
	//
	const fromInput = useSelector((state) => state.books.inputValue)
	console.log(fromInput)

	const perPageBooks = useMemo(() => {
		return books.slice(currentPage * perPage - perPage, currentPage * perPage)
	}, [currentPage, books])

	const choosedBook = perPageBooks.filter((item) => {
		if (item.name.toLowerCase().includes(fromInput.toLowerCase())) {
			return true
		}
		return false
	})
	//

	const textAnimation = {
		hidden: (custom) => ({
			y: 10,
			opacity: 0,
			transition: {
				ease: custom * 8,
			},
		}),
		visible: (custom) => ({
			y: 0,
			opacity: 1,
			transition: {
				ease: custom * 8,
			},
		}),
	}

	const skeletonBooks = [1, 2, 3]

	if (isLoading) {
		return (
			<div className={css(style.book, style.loading)}>
				{skeletonBooks.map((el) => (
					<BookSkeleton key={el} />
				))}
			</div>
		)
	}

	return (
		<>
			<motion.div
				variants={textAnimation}
				animate="visible"
				initial="hidden"
				className={style.book}
			>
				{choosedBook.map((item, i) => (
					<div className={style.book_nom1}>
						<Link to={`/books/${item._id}`}>
							<img src={item.image} alt="" sizes="" srcset="" />
						</Link>
						<div className={style.line_2}>
							<div className={style.title_head}>
								<Link to={`/books/${item._id}`}>{item.name}</Link>
							</div>
							<div className={style.line_1}>
								<div className="left">
									<span className={style.oldPrice}>{item.categoryId.text}</span>
								</div>
							</div>

							<div className={style.title_author}>{item.author}</div>
						</div>

						<div className={style.line_3}>
							<button
								className={style.btn_bye}
								onClick={() => dispatch(addBookInBasket(item._id))}
							>
								Добавить книгу
							</button>
						</div>
					</div>
				))}
			</motion.div>
			<div>
				<Pagination books={books} />
			</div>
		</>
	)
}
function useSelectore() {
	throw new Error('Function not implemented.')
}
function pushBookBasket(): any {
	throw new Error('Function not implemented.')
}

// dispatch(addBookInBasket(item._id))
