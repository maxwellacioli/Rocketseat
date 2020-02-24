import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;

  width: 100%;
  height: 100vh;

  font-size: 30px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    font-size: 16px;
    text-decoration: none;
    color: #7159c1;
  }

  img {
    margin-top: 20px;
    width: 120px;
    border-radius: 50%;
  }

  h1 {
    font-size: 20px;
    margin-top: 15px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  /* margin-top: 30px; */
  /* border-top: 1px solid #eee; */
  list-style-type: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          margin-left: 10px;
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  max-width: 150px;
  display: flex;
  flex-direction: column;

  span {
    margin: 0;
    color: #9157c1;
    font-size: 14px;
    font-weight: bold;
  }

  div {
    margin-left: 0;
    margin-top: 10px;

    button {
      :focus {
        background: #7211c2;
        outline: none;
        box-shadow: none;
      }

      :hover {
        background: #7211c2;
      }

      border: #fff;
      background: #9157c1;
      font-size: 12px;
      border-radius: 4px;
      padding: 5px;
    }
  }
`;
