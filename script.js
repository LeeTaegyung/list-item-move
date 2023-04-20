(() => {
    
    function itemMove() {
        const list = document.querySelector('.list ul');
        let targetItem, cloneItem, moveBtnWidth, top, left;

        function mouseMove(e) {
            top = e.clientY - targetItem.offsetHeight / 2;
            left = e.clientX - targetItem.offsetWidth + moveBtnWidth;
            
            // 커서 위치에 따라 복사한 요소 이동
            cloneItem.style.top = top + 'px';
            cloneItem.style.left = left + 'px';

            // 각 리스트 아이템의 중간 위치값 저장
            const LI = document.querySelectorAll('.list li');
            const liOffset = [];
            for(let i = 0; i < LI.length; i++) {
                // 클론 클래스값을 가진 li를 제외한 위치값 저장
                if(!(LI[i].classList.contains('clone'))) {
                    let LIRect = LI[i].getBoundingClientRect();
                    liOffset.push(LIRect.top + (LIRect.height / 2));
                }
            }
            
            // 현재 커서의 위치보다 아래에 있는 요소의 첫번째 인덱스값 추출
            let targetIdx = liOffset.findIndex(ele => e.clientY <= ele);
            if(targetIdx >= 0) {
                list.insertBefore(targetItem, LI[targetIdx]);
            } else { // 인덱스값이 -1이면(찾지 못하면) 제일 뒤에 이동해주기.
                list.appendChild(targetItem);
            }

        }

        function mouseDown(e) {
            if(e.target.closest('.move')) {
                targetItem = e.target.closest('li');
                cloneItem = targetItem.cloneNode(true);  //요소 복사
                moveBtnWidth = e.target.closest('.move').offsetWidth;
                top = e.clientY - targetItem.offsetHeight / 2;
                left = e.clientX - targetItem.offsetWidth + moveBtnWidth;

                // 클래스 및 복사 요소 추가
                targetItem.classList.add('blank');
                list.append(cloneItem);
                cloneItem.classList.add('clone');
    
                // 복사한 요소 스타일 지정
                cloneItem.style.position = 'fixed';
                cloneItem.style.top = top + 'px';
                cloneItem.style.left = left + 'px';
                cloneItem.style.width = targetItem.offsetWidth + 'px';

                // mouse move 이벤트 실행
                document.addEventListener('mousemove', mouseMove);
            }
        }

        function mouseUp(e) {

            if(cloneItem) {
                targetItem.classList.remove('blank');
                cloneItem.remove();

                // 요소 초기화
                targetItem = undefined;
                cloneItem = undefined;

            }
    
            // mouse move 이벤트 삭제
            document.removeEventListener('mousemove', mouseMove);
        }

        document.addEventListener('mousedown', mouseDown);
        document.addEventListener('mouseup', mouseUp)

    }
    itemMove();

})()