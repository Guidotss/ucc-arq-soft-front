"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface AdminLoaderProps {
  close: boolean;          
  onClose?: () => void;  
}

export const AdminLoader: React.FC<AdminLoaderProps> = ({ close, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (close) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [close, onClose]);

  return (
    <StyledWrapper $closing={isClosing}>
      <div className="card">
        <div className="loader">
          <p>loading</p>
          <div className="words">
            <span className="word">API Gateway Routing</span>
            <span className="word">Nginx configuration</span>
            <span className="word">Docker Instances</span>
            <span className="word">Admin Controllers</span>
            <span className="word">Services States</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $closing: boolean }>`
  transition: transform 2s ease, opacity 2s ease;
  transform-origin: center;
  ${({ $closing }) =>
    $closing &&
    `
    transform: scaleX(0) scaleY(0);
    opacity: 0;
  `}


  .card {
    --bg-color: rgba(33, 33, 33, 0.7);
    background-color: var(--bg-color);
    padding: 1rem 2rem;
    border-radius: 1.25rem;
  }
  .loader {
    color: rgb(200, 200, 200);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 25px;
    box-sizing: content-box;
    height: 40px;
    padding: 10px;
    display: flex;
    border-radius: 8px;
  }
  .words {
    overflow: hidden;
    position: relative;
    text-align: left;
    margin-left: 10px;
  }
  .words::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      var(--bg-color) 10%,
      transparent 30%,
      transparent 70%,
      var(--bg-color) 90%
    );
    z-index: 20;
  }
  .word {
    display: block;
    height: 100%;
    padding-left: 2px;
    color: #956afa;
    animation: spin_4991 4s infinite;
  }
  @keyframes spin_4991 {
    10% {
      transform: translateY(-102%);
    }
    25% {
      transform: translateY(-100%);
    }
    35% {
      transform: translateY(-202%);
    }
    50% {
      transform: translateY(-200%);
    }
    60% {
      transform: translateY(-302%);
    }
    75% {
      transform: translateY(-300%);
    }
    85% {
      transform: translateY(-402%);
    }
    100% {
      transform: translateY(-400%);
    }
  }
`;

export default AdminLoader;
