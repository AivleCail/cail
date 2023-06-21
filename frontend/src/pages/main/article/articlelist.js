import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import './articlelist.css';
import axios from 'axios';
import CommonTable from '../../components/table/CommonTable';
import CommonTableColumn from '../../components/table/CommonTableColumn';
import CommonTableRow from '../../components/table/CommonTableRow';
import Paging from '../page/paging';
import Modal from '../../components/modal/Modal';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(8);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const articlesData = [];

      let page = 1;
      let articleExists = true;

      while (articleExists) {
        try {
          const response = await axios.get(`http://localhost:8080/article/page?page=${page}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const fetchedArticles = response.data.content;

          if (fetchedArticles.length > 0) {
            articlesData.push(...fetchedArticles);
            page++;
          } else {
            articleExists = false;
          }
        } catch (error) {
          articleExists = false;
          console.error('Error fetching articles:', error);
        }
      }

      setArticles(articlesData);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  // Modal Open
  const openModal = async (article) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Article 정보 가져오기
      const response = await axios.get(`http://localhost:8080/article/one?id=${article.articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const detailedArticle = response.data;

      // 댓글 정보 가져오기
      const commentResponse = await axios.get(`http://localhost:8080/comment/list?id=${article.articleId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const comments = commentResponse.data;

      // Article 정보와 댓글 정보를 합쳐서 선택된 article에 comments 필드 추가
      const articleWithComments = { ...detailedArticle, comments };

      setSelectedArticle(articleWithComments);
      setIsOpenModal(true);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };
  // Model Close
  const closeModal = () => {
    setSelectedArticle(null);
    setIsOpenModal(false);
  };

  // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="article-container">
      <Header />
      <Sidebar />

      <div className="background">
        <div className="container">
          <span className="article-text-1">운영자 커뮤니티</span>
          <span className="article-text-2">공지사항을 빠르고 정확하게 안내해드립니다.</span>

          <div className="article">
            <div className="article-table-container">
              <div className="article-table-scroll">
                <CommonTable headersName={['번호', '제목', '글쓴이', '작성일시', '조회']} columnWidths={['4%','', '15%', '20%', '8%']}>
                  {currentArticles.map((article) => (
                    <CommonTableRow key={article.articleId} onClick={() => openModal(article)}>
                      <CommonTableColumn>{article.articleId}</CommonTableColumn>
                      <CommonTableColumn>{article.articleTitle}</CommonTableColumn>
                      <CommonTableColumn>{article.managerName}</CommonTableColumn>
                      <CommonTableColumn>{article.createdAt}</CommonTableColumn>
                      <CommonTableColumn>{article.count}</CommonTableColumn>
                    </CommonTableRow>
                  ))}
                </CommonTable>
              </div>
            </div>
          </div>

          {/* ArticleDetailModal */}
          {isOpenModal && (
            <Modal isOpen={isOpenModal} closeModal={closeModal} article={selectedArticle} comments={selectedArticle.comments}/>
          )}
          
          <Paging
            articlesPerPage={articlesPerPage}
            totalArticles={articles.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
