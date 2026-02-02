/**
 * Pre-Event Summary - Interactive Functionality
 * AcquireUp
 */

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('modal');

function openModal(title, subtitle, data) {
    if (!modal) return;
    
    // Update modal title if provided
    if (title) {
        const modalTitle = modal.querySelector('.modal-title');
        if (modalTitle) modalTitle.textContent = title;
    }
    
    if (subtitle) {
        const modalSubtitle = modal.querySelector('.modal-subtitle');
        if (modalSubtitle) modalSubtitle.textContent = subtitle;
    }
    
    // TODO: Populate table with data when connected to API
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== CLICKABLE TILES =====
document.querySelectorAll('.clickable-tile').forEach(function(tile) {
    tile.addEventListener('click', function() {
        // Toggle active state
        const siblings = this.parentElement.querySelectorAll('.clickable-tile');
        siblings.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // Get tile info for modal
        const label = this.querySelector('.tier-range, .breakdown-bar, .enhanced-label');
        const count = this.querySelector('.tier-count, .breakdown-count, .enhanced-count');
        
        const title = label ? label.textContent.trim() : 'Drill-Down';
        const subtitle = count ? `${count.textContent.trim()} registrants match this criteria` : '';
        
        openModal(`Drill-Down: ${title}`, subtitle);
    });
});

// ===== VIEW ALL BUTTONS =====
document.querySelectorAll('.view-all-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const card = this.closest('.opportunity-card');
        const tierName = card ? card.querySelector('.tier-name') : null;
        const count = card ? card.querySelector('.opportunity-count') : null;
        
        const title = tierName ? tierName.textContent.trim() : 'All Registrants';
        const subtitle = count ? `${count.textContent.trim()} registrants in this tier` : '';
        
        openModal(title, subtitle);
    });
});

// ===== FILTER TAGS =====
document.querySelectorAll('.filter-tag').forEach(function(tag) {
    tag.addEventListener('click', function() {
        // Remove this filter
        this.remove();
        updateFilterResults();
    });
});

document.querySelectorAll('.clear-filters').forEach(function(btn) {
    btn.addEventListener('click', function() {
        const filtersContainer = document.querySelector('.active-filters');
        if (filtersContainer) {
            filtersContainer.innerHTML = '<span style="color: var(--text-muted); font-size: 12px;">No active filters</span>';
        }
        updateFilterResults();
    });
});

function updateFilterResults() {
    const filterResults = document.querySelector('.filter-results');
    const activeFilters = document.querySelectorAll('.filter-tag');
    
    if (filterResults) {
        if (activeFilters.length === 0) {
            filterResults.innerHTML = 'Showing <strong>47 of 47</strong> registrants';
        }
        // TODO: Calculate actual filtered count when connected to data
    }
}

// ===== MODAL FILTER BUTTONS =====
document.querySelectorAll('.modal-filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        // Toggle active state
        const siblings = this.parentElement.querySelectorAll('.modal-filter-btn');
        siblings.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        
        // TODO: Filter table data when connected to API
    });
});

// ===== SCORING SLIDERS =====
// Note: These are visual mockups. Real implementation would need range inputs.
document.querySelectorAll('.slider-track').forEach(function(track) {
    track.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const percent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
        
        const fill = this.querySelector('.slider-fill');
        const thumb = this.querySelector('.slider-thumb');
        const valueDisplay = this.parentElement.querySelector('.slider-value');
        
        if (fill) fill.style.width = `${percent}%`;
        if (thumb) thumb.style.left = `${percent}%`;
        if (valueDisplay) valueDisplay.textContent = `${percent}%`;
        
        // TODO: Recalculate prospect scores when connected to data
        console.log('Slider updated:', percent + '%');
    });
});

// ===== OPPORTUNITY PERSON CARDS =====
document.querySelectorAll('.opportunity-person').forEach(function(person) {
    person.addEventListener('click', function() {
        const name = this.querySelector('.person-name');
        if (name) {
            // TODO: Open individual person detail view
            console.log('Selected person:', name.textContent);
        }
    });
});

// ===== PROSPECT LIST ITEMS =====
document.querySelectorAll('.prospect-item').forEach(function(item) {
    item.addEventListener('click', function() {
        const name = this.querySelector('.prospect-name');
        if (name) {
            // TODO: Open individual person detail view
            console.log('Selected prospect:', name.textContent);
        }
    });
});

// ===== TITLE LIST ITEMS =====
document.querySelectorAll('.title-item').forEach(function(item) {
    item.addEventListener('click', function() {
        const title = this.querySelector('.title-name');
        const count = this.querySelector('.title-count');
        
        if (title && count) {
            openModal(
                `Job Title: ${title.textContent.trim()}`,
                `${count.textContent.trim()} registrants with this title`
            );
        }
    });
});

// ===== GEO LIST ITEMS =====
document.querySelectorAll('.geo-item').forEach(function(item) {
    item.addEventListener('click', function() {
        const zip = this.querySelector('.geo-zip');
        const count = this.querySelector('.geo-count');
        
        if (zip && count) {
            openModal(
                `Zip Code: ${zip.textContent.trim()}`,
                count.textContent.trim()
            );
        }
    });
});

// ===== EDUCATION ITEMS =====
document.querySelectorAll('.edu-item').forEach(function(item) {
    item.addEventListener('click', function() {
        const label = this.querySelector('.edu-label');
        const count = this.querySelector('.edu-count');
        
        if (label && count) {
            openModal(
                `Education: ${label.textContent.trim()}`,
                `${count.textContent.trim()} registrants`
            );
        }
    });
});

// ===== BREAKDOWN BAR ITEMS =====
document.querySelectorAll('.breakdown-bar-container').forEach(function(item) {
    item.addEventListener('click', function() {
        const bar = this.querySelector('.breakdown-bar');
        const countEl = this.parentElement.querySelector('.breakdown-count');
        
        if (bar && countEl) {
            openModal(
                bar.textContent.trim(),
                `${countEl.textContent.trim()} registrants`
            );
        }
    });
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Pre-Event Summary loaded');
    
    // Hide modal on load
    if (modal) {
        modal.style.display = 'none';
    }
});

// ===== UTILITY FUNCTIONS =====

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format percentage
 */
function formatPercent(value) {
    return `${Math.round(value)}%`;
}

/**
 * Calculate prospect score based on weights
 */
function calculateScore(prospect, weights) {
    const { netWorth, age, title, matchScore } = weights;
    
    // Normalize values (0-100 scale)
    const worthScore = normalizeWorth(prospect.worth);
    const ageScore = normalizeAge(prospect.age);
    const titleScore = normalizeTitle(prospect.jobTitle);
    const match = prospect.matchScore * 10; // Convert 1-10 to 0-100
    
    return Math.round(
        (worthScore * netWorth / 100) +
        (ageScore * age / 100) +
        (titleScore * title / 100) +
        (match * matchScore / 100)
    );
}

function normalizeWorth(worth) {
    const tiers = {
        '$1M+': 100,
        '$500K-$1M': 75,
        '$250K-$500K': 50,
        'Under $250K': 25
    };
    return tiers[worth] || 0;
}

function normalizeAge(age) {
    // Higher score for retirement-ready ages (55-70)
    if (age >= 60 && age <= 70) return 100;
    if (age >= 55 && age < 60) return 85;
    if (age > 70) return 70;
    if (age >= 50 && age < 55) return 60;
    if (age >= 45 && age < 50) return 40;
    return 20;
}

function normalizeTitle(title) {
    const highValue = ['ceo', 'cfo', 'owner', 'president', 'partner', 'physician', 'doctor', 'attorney'];
    const medValue = ['director', 'vp', 'vice president', 'manager', 'executive'];
    
    const lowerTitle = title.toLowerCase();
    
    if (highValue.some(t => lowerTitle.includes(t))) return 100;
    if (medValue.some(t => lowerTitle.includes(t))) return 70;
    return 40;
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        openModal,
        closeModal,
        calculateScore,
        formatCurrency,
        formatPercent
    };
}
