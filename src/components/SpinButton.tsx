import React, { useState, MouseEvent, useId } from "react";
import "./SpinButton.css";

const SpinButton: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [announceText, setAnnounceText] = useState<string | null>(null);

  const countInputId = useId();

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
    setAnnounceText('성인 승객을 늘립니다');
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
    setAnnounceText('성인 승객을 줄입니다');
  };

  const toggleTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <section className="spinButtonContainer">
      <fieldset>
        <legend>승객 선택</legend>
        <div className="spinButtonLabel">
          <label htmlFor={countInputId}>성인</label>
          <div
            className="helpIcon"
            onMouseEnter={toggleTooltip}
            onMouseLeave={toggleTooltip}
            aria-label="tooltip"
          >
            ?
            {isTooltipVisible && (
              <span className="tooltip">최대 인원수는 3명까지 가능합니다</span>
            )}
          </div>
        </div>
        <button
          onClick={decrement}
          className="spinButton"
          aria-label="성인 탑승자 인원 감소"
        >
          -
        </button>
        <input
          type="text"
          role="spinbutton"
          readOnly
          id={countInputId}
          className="spinButtonInput"
          value={count}
          aria-label="성인 탑승자 인원 수정"
          aria-live="polite"
          aria-atomic="true"
          aria-relevant="text"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={count}
        />
        <button
          onClick={increment}
          className="spinButton"
          aria-label="성인 탑승자 인원 증가"
        >
          +
        </button>
      </fieldset>
      <div className="hidden" aria-live="assertive">
        {announceText}
      </div>
    </section>
  );
};

export default SpinButton;
