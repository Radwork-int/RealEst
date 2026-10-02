using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Estate.Models;
using Estate.Providers;

namespace Estate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EstateListingsController : Controller
    {
        private readonly EstateListingsContext _context;

        public EstateListingsController(EstateListingsContext context)
        {
            _context = context;
        }

        // GET: api/EstateListings
        // Returns all estate listings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstateListings>>> GetListings()
        {
            var listings = await _context.EstateListings
                .AsNoTracking() // Improves performance for read-only queries
                .ToListAsync();

            return Ok(listings);
        }

        //// GET: EstateListings
        //public async Task<IActionResult> Index()
        //{
        //    return View(await _context.EstateListings.ToListAsync());
        //}

        //// GET: EstateListings/Details/5
        //public async Task<IActionResult> Details(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var estateListing = await _context.EstateListings
        //        .FirstOrDefaultAsync(m => m.ID == id);
        //    if (estateListing == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(estateListing);
        //}

        //// GET: EstateListings/Create
        //public IActionResult Create()
        //{
        //    return View();
        //}

        //// POST: EstateListings/Create
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("ID,Source,Address,City,State,ZipCode,Price,Bedrooms,Bathrooms,Squareft,Latitude,Longitude,ListedDate,Status,Description")] EstateListings estateListing)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(estateListing);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(estateListing);
        //}

        //// GET: EstateListings/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var estateListing = await _context.EstateListings.FindAsync(id);
        //    if (estateListing == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(estateListing);
        //}

        //// POST: EstateListings/Edit/5
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("ID,Source,Address,City,State,ZipCode,Price,Bedrooms,Bathrooms,Squareft,Latitude,Longitude,ListedDate,Status,Description")] EstateListing estateListing)
        //{
        //    if (id != estateListing.ID)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(estateListing);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!EstateListingExists(estateListing.ID))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(estateListing);
        //}

        //// GET: EstateListings/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var estateListing = await _context.EstateListings
        //        .FirstOrDefaultAsync(m => m.ID == id);
        //    if (estateListing == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(estateListing);
        //}

        //// POST: EstateListings/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var estateListing = await _context.EstateListings.FindAsync(id);
        //    if (estateListing != null)
        //    {
        //        _context.EstateListings.Remove(estateListing);
        //    }

        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        //private bool EstateListingExists(int id)
        //{
        //    return _context.EstateListings.Any(e => e.ID == id);
        //}
    }
}
