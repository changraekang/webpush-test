import styled from "styled-components";
import {grey1, primary3, primary4} from '../../constants/color'

const WrapPagination = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0 0 30px 0;
  gap: 6px;
`

const LiStyle = styled.li`
  background-color: ${primary4};
  padding: 3px 3px 2px;
  border-radius: 6px;
  `

const BtnStyle = styled.button`
  color: ${grey1};
`

function Pagination({totalPost, postsPerPage, setCurrrentPage}) {
  let pages = [];
  for(let i = 1; i <= Math.ceil(totalPost/postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <WrapPagination>
      {pages.map((page, index)=> {
        return (
        <LiStyle key={index} >
          <BtnStyle onClick={() => {setCurrrentPage(page)}}>
            {page}
          </BtnStyle>
        </LiStyle>
        )
      })}
    </WrapPagination>
  )
}

export default Pagination