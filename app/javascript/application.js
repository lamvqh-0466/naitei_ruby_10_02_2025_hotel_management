import '@hotwired/turbo-rails'
import 'controllers'
import 'custom/room_type_form'
import 'custom/upload_images'
import 'custom/month_picker'
import './book_button'
import 'custom/qr_countdown'
import './flash_session'
import 'chartkick'
import 'Chart.bundle'

document.addEventListener('turbo:load', function () {
    const applyDate = document.getElementById('apply-dates');
    const checkInInput = document.getElementById('check-in-date');
    const checkOutInput = document.getElementById('check-out-date');

    if (!applyDate || !checkInInput || !checkOutInput) return;

    const errorMessage = document.createElement('div');
    errorMessage.id = 'date-error';
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '5px';
    checkOutInput.parentElement.appendChild(errorMessage);

    function updateCheckOutMinDate() {
        const checkInDate = new Date(checkInInput.value);
        if (checkInDate) {
            const minCheckOutDate = new Date(checkInDate);
            minCheckOutDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.min = minCheckOutDate.toISOString().split('T')[0];
        }
    }

    function validateDates() {
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);
        if (checkInDate && checkOutDate && checkOutDate <= checkInDate) {
            applyDate.classList.add('disabled');
            return false;
        } else {
            errorMessage.textContent = '';
            applyDate.classList.remove('disabled');
            return true;
        }
    }

    checkInInput.addEventListener('change', function () {
        updateCheckOutMinDate();
        validateDates();
    });
    checkOutInput.addEventListener('change', validateDates);
    applyDate.addEventListener('click', function (event) {
        event.preventDefault();
        if (!validateDates()) return;

        const checkinDate = checkInInput.value;
        const checkoutDate = checkOutInput.value;
        if (checkinDate && checkoutDate) {
            const url = `/user/room_types?checkin_date=${checkinDate}&checkout_date=${checkoutDate}`;
            Turbo.visit(url);
        }
    });
});
