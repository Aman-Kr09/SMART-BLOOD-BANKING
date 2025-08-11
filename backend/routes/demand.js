const express = require('express');
const router = express.Router();

/**
 * This route is a placeholder.
 * You cannot use Python .pkl models directly in Node.js.
 * Instead, use a separate Python backend and call it via /predict.
 */

// GET placeholder
router.get('/', (req, res) => {
  res.json({ message: 'Demand route is not implemented in Node.js. Use /predict for ML.' });
});

// POST placeholder (returns dummy response)
router.post('/', (req, res) => {
  try {
    const { Date: dateStr } = req.body;
    const dateObj = dateStr ? new Date(dateStr) : null;
    res.json({
      message: 'Prediction not available in Node.js. Use /predict route.',
      parsedDate: dateObj ? dateObj.toISOString() : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Prediction failed.' });
  }
});

module.exports = router;
module.exports = router;
      HospitalAdmissions == null ||
      BloodDonorsAvailable == null ||
      Temperature == null
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Convert Date to DayOfWeek and Month
    const dateObj = new Date(Date);
    const dayOfWeek = dateObj.getDay(); // 0=Sunday, 1=Monday, ...
    const month = dateObj.getMonth() + 1; // 1-12

    // Prepare input array
    const inputArr = [
      dayOfWeek,
      month,
      Number(Population),
      Number(Events),
      Number(HistoricalBloodUsage),
      Number(HospitalAdmissions),
      Number(BloodDonorsAvailable),
      Number(Temperature)
    ];

    // ⛔ Node.js cannot load .pkl models
    // Suggest using Python backend (Flask/FastAPI) and call it using fetch/axios
    res.json({
      message: 'Prediction not available in Node.js. Please use /predict route to call Python backend.',
      input: inputArr
    });

  } catch (err) {
    console.error('Demand prediction error:', err);
    res.status(500).json({ error: 'Prediction failed.' });
  }
});

module.exports = router;
