document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('certificate-modal');
    const modalCertImage = document.getElementById('modal-cert-image');
    const modalDownloadLink = document.getElementById('modal-download-link');
    const modalCloseBtn = modal.querySelector('.modal-close-btn');
    const modalTitleElement = document.getElementById('modal-certificate-title');

    const showCertificateBtns = document.querySelectorAll('.show-certificate-btn');

    showCertificateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const imageSrc = btn.dataset.imageSrc;
            const pdfSrc = btn.dataset.pdfSrc;
            const titleKey = btn.dataset.certificateTitleKey;

            if (!imageSrc) { // If imageSrc is empty (e.g. UCMAS initially)
                console.warn('Image source is missing for this certificate.');
                // Optionally, disable the button or provide feedback to the user
                // For now, we just don't open the modal.
                return;
            }

            modalCertImage.src = imageSrc;
            modalCertImage.alt = `Certificate Image: ${titleKey}`; // Better alt text

            if (pdfSrc) {
                modalDownloadLink.href = pdfSrc;
                modalDownloadLink.style.display = 'inline-flex'; // Show download button
                modalDownloadLink.target = "_blank"; // Open in a new tab
                modalDownloadLink.removeAttribute('download'); // Ensure download attribute is removed
            } else {
                modalDownloadLink.style.display = 'none'; // Hide if no PDF
                modalDownloadLink.removeAttribute('target'); // Clear target if no PDF
            }

            // Update modal title using translations if available
            if (window.translations && titleKey) {
                const currentLang = document.documentElement.lang || 'en';
                const translatedTitle = translations[currentLang]?.[titleKey] || translations['en']?.[titleKey];
                if (translatedTitle) {
                    modalTitleElement.textContent = translatedTitle;
                } else {
                    // Fallback to the default title if specific one not found
                    const defaultTitleKey = modalTitleElement.dataset.translate;
                     const defaultTranslatedTitle = translations[currentLang]?.[defaultTitleKey] || translations['en']?.[defaultTitleKey] || "Certificate Preview";
                    modalTitleElement.textContent = defaultTranslatedTitle;
                }
            } else {
                 const defaultTitleKey = modalTitleElement.dataset.translate;
                 const defaultTranslatedTitle = (window.translations && (translations[document.documentElement.lang || 'en']?.[defaultTitleKey] || translations['en']?.[defaultTitleKey])) || "Certificate Preview";
                 modalTitleElement.textContent = defaultTranslatedTitle;
            }


            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Re-render Lucide icons if they are used in the modal
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });

    // Close modal events
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        // Close if clicked on the overlay (modal itself) but not on its content
        if (event.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
        modalCertImage.src = ''; // Clear image src to prevent loading issues
    }

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}); 